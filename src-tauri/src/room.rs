use dotenv::dotenv;
use std::env;

#[tauri::command]
pub async fn create_room () -> Result<String, String> {

    let server_url = env::var("SERVER_URL").expect("The config is not correct");

    let response: reqwest::Response  = match reqwest::Client::new().post(format!("{}/api/room", server_url))
        .json(&serde_json::json!({"test": "fill with name"}))
        .send()
        .await 
        {
            Ok(res) => res,
            Err(_) => return Err("Something went wrong with the request".into()),
        };
    
    
    if !response.status().is_success() {
        return Err("Something went wrong with the request".into());
    }

    let json_response: String = match response.text().await {
        Ok(json) => json,
        Err(_) => return Err("Failed to convert to json".into()),
    };

    Ok(json_response)
}
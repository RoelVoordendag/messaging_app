use dotenv::dotenv;

#[tauri::command]
pub async fn create_room () {
    dotenv().ok();

    println!("we are going to create a room");

    let create_room_request = reqwest::Client::new().post("http://lmao.com")
        .json(&serde_json::json!({"test": "fill with name"}))
        .send()
        .await;
    
}
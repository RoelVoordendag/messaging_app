// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod users;
mod room;

use dotenv::dotenv;
use reqwest::Client;
use std::env;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login_user(name: String) -> Result<String, String> {
    // @todo can we move this to a auto start?
    dotenv().ok();

    let server_url = env::var("SERVER_URL").expect("The config is not correct");

    let client = Client::new();

    let response: reqwest::Response = match client
        .post(format!("{}/api/users/create", server_url))
        .json(&serde_json::json!({"name":name}))
        .send()
        .await
    {
        Ok(res) => res,
        Err(_) => return Err("Something went wrong with the request".into()),
    };

    if !response.status().is_success() {
        return Err("Something with the request went wrong".into());
    }

    let json_response: String = match response.text().await {
        Ok(json) => json,
        Err(_) => return Err("Failed to convert to json".into()),
    };

    Ok(json_response)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login_user, users::get_users, room::create_room])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

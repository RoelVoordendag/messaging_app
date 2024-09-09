// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use dotenv::dotenv;
use reqwest::{Client, StatusCode};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login_user(name: String) -> Result<(), String>  {
    // @todo can we move this to a auto start?
    dotenv().ok();

    let server_url = env::var("SERVER_URL").expect("The config is not correct");

    let client = Client::new();

    let response = match client.post(format!("{}/api/users/create",server_url)).json(&serde_json::json!({"name":name})).send().await {
        Ok(res) => res,
        Err(_) => return Err("Something went wrong with the request".into()),
    };

    match response.status() {
        StatusCode::OK => Ok(()),
        status => Err(format!("Request failed with status: {}", status)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

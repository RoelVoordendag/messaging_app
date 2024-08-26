// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use dotenv::dotenv;
use reqwest::Client;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login_user()  {
    // @todo can we move this to a auto start?
    dotenv().ok();

    let server_url = env::var("SERVER_URL").expect("The config is not correct");

    let client = Client::new();

    let res = client.post(format!("{}/", server_url));

    /**
     * @todo
     *  Do API call to /api/users/create
     *  with body:
     *  {
           "name": "XXX"
        }
     * 
     * Check if we get response back and then go to next screen
     */

    println!("Message from Russt: {}", server_url);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::{ info };

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn send_message(message: &str) -> String {
    format!("Hello, {}! You've been greeted from the BE!", message)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().build())
        .invoke_handler(tauri::generate_handler![send_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

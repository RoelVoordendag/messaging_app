#[tauri::command]
async fn create_room () {
    // @todo can we move this to a auto start?
    dotenv().ok();

    println!("LMO");
}
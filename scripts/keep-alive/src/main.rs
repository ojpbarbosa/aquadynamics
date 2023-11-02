use serde::{Deserialize, Serialize};
use std::time::Instant;

const CORE_SERVICE_URL: &str = "https://aquadynamics-core.onrender.com";

const KEEP_ALIVE_SECONDS_TIMEOUT: u64 = 60 * 3; // 3 minutes

#[derive(Serialize, Deserialize)]
struct Log {
    id: String,
    #[serde(rename = "aquariumId")]
    aquarium_id: String,
    #[serde(rename = "controllerId")]
    controller_id: String,
    temperature: f64,
    ph: f64,
    lightning: bool,
    timestamp: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    loop {
        let mut now = chrono::Local::now();
        println!(
            "Keeping \x1b[34mAqua\x1b[0m\x1b[33mDynamics\x1b[0m alive on {}\x1b[0m",
            now.format("%B %-d, %Y, %H:%M").to_string()
        );

        println!("\nFetching logs from {}", CORE_SERVICE_URL);

        let start_time = Instant::now();
        let logs = reqwest::get(format!("{}/api/logs", CORE_SERVICE_URL))
            .await?
            .json::<Vec<Log>>()
            .await?;
        let elapsed_time = start_time.elapsed();

        now = chrono::Local::now();
        println!(
            "Succesfully fetched {} logs at {} ({} ms)\n",
            logs.len(),
            now.format("%H:%M:%S").to_string(),
            elapsed_time.as_millis()
        );

        tokio::time::sleep(tokio::time::Duration::from_secs(KEEP_ALIVE_SECONDS_TIMEOUT)).await;
    }
}

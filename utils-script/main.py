import asyncio
import edge_tts
import os
import subprocess

# Config
LANGUAGES = ['ENG', 'ITA']
INPUT_FILE_FOLDER = "observing_silhouettes/commentary_script"
PHOTO_SERIES_NAME = "observing_silhouettes"
OUTPUT_FILE = f"observing_silhouettes/commentary_voice/[lang]_[voice]_{PHOTO_SERIES_NAME}_narration.mp3"
VOICES = {'ENG': ['en-IE-EmilyNeural'], #'en-CA-LiamNeural',
          'ITA': ['it-IT-IsabellaNeural']}
RATES = {
    'ENG': '-8%',
    'ITA': '-2%'
}
PITCH = "-5Hz"


async def generate_narration():
    for lang in LANGUAGES:
        input_files = [f for f in os.listdir(INPUT_FILE_FOLDER) if f.startswith(lang)]
        for input_file in input_files:
            file = os.path.join(INPUT_FILE_FOLDER, input_file)
            for voice in VOICES[lang]:
                os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
                with open(file, "r", encoding="utf-8") as f:
                    text_to_read = f.read()

                if not text_to_read.strip():
                    continue

                print(f"######### Generating: LANG:{lang}, Voice:{voice} #########")

                final_output = OUTPUT_FILE.replace("[lang]", lang).replace("[voice]", voice)
                temp_output = "temp_raw_audio.mp3"

                communicate = edge_tts.Communicate(text_to_read, voice, pitch=PITCH, rate=RATES[lang])
                await communicate.save(temp_output)

                # 2. Process with FFmpeg to compress audio
                # -ac 1 forza il Mono
                # -ab 96k imposta il bitrate a 96kbps
                try:
                    command = [
                        'ffmpeg', '-y', '-i', temp_output,
                        '-ac', '1',
                        '-ab', '96k',
                        final_output
                    ]
                    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                    print(f"Audio compressed and saved to '{final_output}'")
                except Exception as e:
                    print(f"FFmpeg Error: {e}")
                finally:
                    if os.path.exists(temp_output):
                        os.remove(temp_output)

                print("######### Task Completed #########")


if __name__ == "__main__":
    asyncio.run(generate_narration())
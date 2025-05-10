import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RecordScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audio Recorder</Text>

      <TouchableOpacity style={styles.recordButton} onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.recordButtonText}>{isRecording ? "🛑 Stop Recording" : "🎙 Start Recording"}</Text>
      </TouchableOpacity>

      {audioURL && (
        <View style={styles.audioPlayer}>
          <Text style={styles.audioText}>🔊 Recorded Audio:</Text>
          <audio controls src={audioURL} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20, alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  recordButton: { backgroundColor: "red", padding: 15, borderRadius: 10, marginVertical: 10 },
  recordButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  audioPlayer: { marginTop: 20, alignItems: "center" },
  audioText: { fontSize: 16, fontWeight: "bold" },
});

export default RecordScreen;

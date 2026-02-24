import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SuperPage() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: "1", text: "Master React Native basics", completed: false },
    { id: "2", text: "GitHub repo updated", completed: true },
  ]);

  const theme = {
    bg: isDark ? "#121212" : "#F0F2F8",
    card: isDark ? "#1E1E1E" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#1A1A1A",
    subText: isDark ? "#A0A0A0" : "#666666",
    accent: "#7D58FF",
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        { id: Date.now().toString(), text: task, completed: false },
        ...tasks,
      ]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // --- دالة المسح الجديدة ---
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* 1. Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcome, { color: theme.subText }]}>
            Good Morning,
          </Text>
          <Text style={[styles.name, { color: theme.text }]}>Mariem ✨</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsDark(!isDark)}
          style={[styles.themeBtn, { backgroundColor: theme.card }]}
        >
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={isDark ? "#FFD700" : "#7D58FF"}
          />
        </TouchableOpacity>
      </View>

      {/* 2. Tabs */}
      <View style={styles.tabContainer}>
        {["Tasks", "Stats"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab
                ? { backgroundColor: theme.accent }
                : { backgroundColor: theme.card },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? { color: "white" } : { color: theme.subText },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Content */}
      <View style={styles.content}>
        {activeTab === "Tasks" ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: theme.card }]}>
                {/* الجزء الخاص بالنص والتبديل */}
                <TouchableOpacity
                  onPress={() => toggleTask(item.id)}
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                >
                  <Ionicons
                    name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={24}
                    color={item.completed ? "#4CAF50" : theme.accent}
                  />
                  <Text
                    style={[
                      styles.taskText,
                      { color: theme.text },
                      item.completed && styles.completedText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>

                {/* زرار المسح (Trash Icon) */}
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="#FF5E5E" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <View style={styles.centered}>
            <View style={[styles.statsCircle, { borderColor: theme.accent }]}>
              <Text style={[styles.statsNumber, { color: theme.accent }]}>
                {tasks.length > 0
                  ? Math.round(
                      (tasks.filter((t) => t.completed).length / tasks.length) * 100
                    )
                  : 0}
                %
              </Text>
            </View>
            <Text style={[styles.statsInfo, { color: theme.text }]}>
              Leveling up your productivity!
            </Text>
          </View>
        )}
      </View>

      {/* 4. Input Area */}
      {activeTab === "Tasks" && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputArea}
        >
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.card, color: theme.text },
            ]}
            placeholder="What's your goal?"
            placeholderTextColor={theme.subText}
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity
            onPress={addTask}
            style={[styles.addBtn, { backgroundColor: theme.accent }]}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 30, paddingTop: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welcome: { fontSize: 16 },
  name: { fontSize: 26, fontWeight: "bold" },
  themeBtn: { width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", elevation: 5 },
  tabContainer: { flexDirection: "row", paddingHorizontal: 20, marginBottom: 20 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 25, borderRadius: 15, marginRight: 10, elevation: 2 },
  tabText: { fontWeight: "bold" },
  content: { flex: 1, paddingHorizontal: 20 },
  card: {
    padding: 20,
    borderRadius: 20,
    flexDirection: "row", // عشان النص والزبالة يبقوا جنب بعض
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
    shadowOpacity: 0.05,
  },
  taskText: { marginLeft: 15, fontSize: 16, fontWeight: "500", flex: 1 },
  completedText: { textDecorationLine: "line-through", opacity: 0.5 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  statsCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 8, justifyContent: "center", alignItems: "center" },
  statsNumber: { fontSize: 32, fontWeight: "bold" },
  statsInfo: { marginTop: 20, fontSize: 18, fontWeight: "500" },
  inputArea: { position: "absolute", bottom: 30, left: 20, right: 20, flexDirection: "row" },
  input: { flex: 1, height: 60, borderRadius: 30, paddingHorizontal: 25, elevation: 10, fontSize: 16 },
  addBtn: { width: 60, height: 60, borderRadius: 30, marginLeft: 15, justifyContent: "center", alignItems: "center", elevation: 10 },
});
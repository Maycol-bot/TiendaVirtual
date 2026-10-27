import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Categoria({
  nombre,
  icono,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.contenedor}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icono}
        size={30}
        color="#7C7CFF"
      />

      <Text style={styles.nombre}>
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },

  nombre: {
    fontSize: 12,
    color: "#7C7CFF",
    marginTop: 6,
    textAlign: "center",
  },
});
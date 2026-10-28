import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function OtraScreenCliente({
  navigation,
}) {
  const cerrarSesion = () => {
    navigation
      .getParent()
      ?.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Mi perfil
      </Text>

      <Text style={styles.texto}>
        Bienvenido al área del cliente.
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoBoton}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  texto: {
    marginBottom: 30,
  },

  boton: {
    backgroundColor: "#7C7CFF",
    padding: 15,
    borderRadius: 10,
  },

  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Producto({
  nombre,
  precio,
  tiempo,
  imagen,
  color,
}) {
  return (
    <View style={styles.tarjeta}>
      <View
        style={[
          styles.contenedorImagen,
          {
            backgroundColor:
              color || "#EAEAEA",
          },
        ]}
      >
        <Image
          source={{ uri: imagen }}
          style={styles.imagen}
        />
      </View>

      <View style={styles.informacion}>
        <View style={styles.filaPrecio}>
          <Text style={styles.precio}>
            ${precio}
          </Text>

          <TouchableOpacity>
            <Ionicons
              name="heart-outline"
              size={20}
              color="#BFC2D9"
            />
          </TouchableOpacity>
        </View>

        <Text
          style={styles.nombre}
          numberOfLines={1}
        >
          {nombre}
        </Text>

        <Text style={styles.tiempo}>
          {tiempo}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#EFEFEF",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  contenedorImagen: {
    height: 170,

    justifyContent: "center",
    alignItems: "center",
  },

  imagen: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },

  informacion: {
    padding: 10,
  },

  filaPrecio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  precio: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1A1A1A",
  },

  nombre: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  tiempo: {
    marginTop: 5,
    color: "#999",
    fontSize: 11,
  },
});
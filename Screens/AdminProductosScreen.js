import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { useIsFocused } from "@react-navigation/native";
import { db } from "../firebase/config";

export default function AdminProductosScreen({
  navigation,
}) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const obtenerProductos = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(
        collection(db, "Producto")
      );

      const lista = [];

      querySnapshot.forEach((documento) => {
        lista.push({
          docId: documento.id,
          ...documento.data(),
        });
      });

      setProductos(lista);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudieron cargar los productos"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      obtenerProductos();
    }
  }, [isFocused]);

  const confirmarEliminacion = (
    docId,
    nombre
  ) => {
    Alert.alert(
      "Eliminar producto",
      `¿Desea eliminar ${nombre}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () =>
            ejecutarEliminacion(docId),
        },
      ]
    );
  };

  const ejecutarEliminacion = async (
    docId
  ) => {
    try {
      await deleteDoc(
        doc(db, "Producto", docId)
      );

      Alert.alert(
        "Éxito",
        "Producto eliminado"
      );

      obtenerProductos();
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo eliminar"
      );

      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imagen }}
        style={styles.imagen}
      />

      <View style={styles.info}>
        <Text style={styles.nombre}>
          {item.nombre}
        </Text>

        <Text style={styles.detalle}>
          Precio: C$ {item.precio}
        </Text>

        <Text style={styles.detalle}>
          Cat ID: {item.categoriaId}
        </Text>

        <Text style={styles.detalle}>
          Color: {item.color}
        </Text>

        <Text style={styles.tiempo}>
          {item.tiempo}
        </Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity
          style={[
            styles.boton,
            styles.editar,
          ]}
          onPress={() =>
            navigation.navigate(
              "FormularioProducto",
              {
                producto: item,
              }
            )
          }
        >
          <Text>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.boton,
            styles.eliminar,
          ]}
          onPress={() =>
            confirmarEliminacion(
              item.docId,
              item.nombre
            )
          }
        >
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnAgregar}
        onPress={() =>
          navigation.navigate(
            "FormularioProducto"
          )
        }
      >
        <Text style={styles.textoAgregar}>
          + Agregar producto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item) =>
          item.docId
        }
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={obtenerProductos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  btnAgregar: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },

  textoAgregar: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  imagen: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },

  detalle: {
    color: "#666",
  },

  tiempo: {
    color: "#999",
    fontSize: 11,
    marginTop: 3,
  },

  botones: {
    gap: 8,
  },

  boton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  editar: {
    backgroundColor: "#E3F2FD",
  },

  eliminar: {
    backgroundColor: "#FFEBEE",
  },
});
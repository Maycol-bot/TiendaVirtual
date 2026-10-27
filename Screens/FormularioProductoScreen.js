import React, {
  useState,
  useEffect,
} from "react";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export default function FormularioProductoScreen({
  route,
  navigation,
}) {
  const productoEditar =
    route.params?.producto;

  const [docId, setDocId] =
    useState(null);

  const [categoriaId, setCategoriaId] =
    useState("");

  const [nombre, setNombre] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [color, setColor] =
    useState("");

  const [imagen, setImagen] =
    useState("");

  const [tiempo, setTiempo] =
    useState("");

  useEffect(() => {
    if (productoEditar) {
      setDocId(productoEditar.docId);

      setCategoriaId(
        String(
          productoEditar.categoriaId
        )
      );

      setNombre(productoEditar.nombre);

      setPrecio(
        String(productoEditar.precio)
      );

      setColor(productoEditar.color);

      setImagen(productoEditar.imagen);

      setTiempo(productoEditar.tiempo);
    }
  }, [productoEditar]);

  const guardarProducto = async () => {
    if (
      !categoriaId ||
      !nombre ||
      !precio ||
      !color ||
      !imagen ||
      !tiempo
    ) {
      Alert.alert(
        "Atención",
        "Complete todos los campos"
      );
      return;
    }

    const payload = {
      categoriaId:
        Number(categoriaId),

      nombre,

      precio: Number(precio),

      color,

      imagen,

      tiempo,
    };

    try {
      if (docId) {
        const referencia = doc(
          db,
          "Producto",
          docId
        );

        await updateDoc(
          referencia,
          payload
        );

        Alert.alert(
          "Éxito",
          "Producto actualizado"
        );
      } else {
        await addDoc(
          collection(db, "Producto"),
          payload
        );

        Alert.alert(
          "Éxito",
          "Producto guardado"
        );
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error.message
      );

      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>
        ID Categoría
      </Text>

      <TextInput
        style={styles.input}
        placeholder="1"
        keyboardType="numeric"
        value={categoriaId}
        onChangeText={setCategoriaId}
      />

      <Text style={styles.label}>
        Nombre
      </Text>

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>
        Precio
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>
        Color
      </Text>

      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
      />

      <Text style={styles.label}>
        Imagen URL
      </Text>

      <TextInput
        style={styles.input}
        value={imagen}
        onChangeText={setImagen}
      />

      <Text style={styles.label}>
        Tiempo
      </Text>

      <TextInput
        style={styles.input}
        value={tiempo}
        onChangeText={setTiempo}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={guardarProducto}
      >
        <Text style={styles.textoBoton}>
          {docId
            ? "ACTUALIZAR PRODUCTO"
            : "GUARDAR PRODUCTO"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  label: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  boton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },

  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

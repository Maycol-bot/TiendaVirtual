import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Login from "../Screens/Login";
import CatalogoScreen from '../Screens/Catalogo.js';
import AdminProductosScreen from '../Screens/AdminProductosScreen.js';
import FormularioProductoScreen from '../Screens/FormularioProductoScreen.js';
import NuevoProducto from "../Screens/nuevoProducto.js";
import OtraScreenCliente from "../Screens/otraScreenCliente.js";
import OtraScreenAdmin from "../Screens/otraScreenAdmin.js";

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// Stack del catálogo
function CatalogoStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalogo"
        component={ CatalogoScreen }
        options={ { title: "Catálogo" } }
      />
      <Stack.Screen
        name="DetalleProducto"
        component={ NuevoProducto }
        options={ { title: "Detalle del producto", headerShown: false } }
      />
    </Stack.Navigator>
  );
}

// Stack de administración
function AdminStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminProductos"
        component={ AdminProductosScreen }
        options={ { headerShown: false } }
      />
      <Stack.Screen
        name="FormularioProducto"
        component={ FormularioProductoScreen }
        options={ { headerShown: false } }
      />
    </Stack.Navigator>
  );
}

// Pestañas del cliente
function ClienteTabs () {
  return (
    <Tab.Navigator
      screenOptions={ {
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
      } }
    >
      <Tab.Screen
        name="CatalogoTab"
        component={ CatalogoStack }
        options={ {
          title: "Catálogo",
          tabBarIcon: ( { color, size } ) => (
            <Ionicons name="home-outline" color={ color } size={ size } />
          ),
        } }
      />
      <Tab.Screen
        name="OtraScreenCliente"
        component={ OtraScreenCliente }
        options={ {
          title: "Mi perfil",
          tabBarIcon: ( { color, size } ) => (
            <Ionicons name="person-outline" color={ color } size={ size } />
          ),
        } }
      />
    </Tab.Navigator>
  );
}

// Pestañas del administrador
function AdminTabs () {
  return (
    <Tab.Navigator
      screenOptions={ {
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
      } }
    >
      <Tab.Screen
        name="ProductosTab"
        component={ AdminStack }
        options={ {
          title: "Productos",
          tabBarIcon: ( { color, size } ) => (
            <Ionicons name="cube-outline" color={ color } size={ size } />
          ),
        } }
      />
      <Tab.Screen
        name="OtraScreenAdmin"
        component={ OtraScreenAdmin }
        options={ {
          title: "Mi perfil",
          tabBarIcon: ( { color, size } ) => (
            <Ionicons name="person-outline" color={ color } size={ size } />
          ),
        } }
      />
    </Tab.Navigator>
  );
}

export default function Navegacion () {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={ { headerShown: false } }
      >
        <RootStack.Screen name="Login" component={ Login } />
        <RootStack.Screen name="ClienteTabs" component={ ClienteTabs } />
        <RootStack.Screen name="AdminTabs" component={ AdminTabs } />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
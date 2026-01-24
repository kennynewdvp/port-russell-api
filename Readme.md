# ⚓ API Port-Russell - Gestion Portuaire

Projet réalisé dans le cadre du **Devoir Pratique n°6**. Cette application permet la gestion complète des infrastructures d'un port de plaisance (catways), des réservations et des accès employés.

## 🚀 Fonctionnalités
- **Authentification** : Système sécurisé via **JWT** et stockage en cookies `httpOnly`.
- **Gestion des Catways** : CRUD complet pour administrer les pontons.
- **Gestion des Réservations** : Suivi des bateaux et des périodes d'occupation.
- **Gestion des Utilisateurs** : Contrôle d'accès basé sur les rôles (**RBAC**).

## 🛠️ Installation et Lancement
1. **Extraire l'archive** (le dossier `node_modules` a été retiré pour la légèreté).
2. **Installer les dépendances** :
   ```bash
   npm install


   ## 👤 Comptes de test pour la correction

Pour tester le système de gestion des droits (RBAC), vous pouvez utiliser les deux comptes suivants pré-enregistrés en base de données :

| Rôle | Adresse Email | Mot de passe | Permissions |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@russell.com` | `password123` | **Accès total** (Gestion des employés, création/suppression de catways). |
| **USER** | `jean@russell.com` | `123456` | **Lecture seule** (Peut voir le dashboard, mais bloqué pour les modifications). |

> **Note** : Les mots de passe sont hachés en base de données via **BCrypt** pour garantir la sécurité.
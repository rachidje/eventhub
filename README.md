# EventHub – Plateforme de Gestion d'Événements

[![codecov](https://codecov.io/gh/rachidje/eventhub/graph/badge.svg?token=XOWN9166FY)](https://codecov.io/gh/rachidje/eventhub)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-orange.svg)](https://expressjs.com/)
[![Dockerized](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)]()

**EventHub** est une application web de gestion d’événements et de billetterie, **conçue pour les apprenants que j'accompagne dans le cadre du titre professionnel CDA**. Elle permet aux organisateurs de créer et gérer leurs événements, et aux utilisateurs de réserver leurs places simplement et en toute sécurité.

---

## Points clés

* **Architecture backend** en **couches (clean architecture)** : séparation stricte entre contrôleurs, services métiers, repositories, entités.
* **Frontend en architecture Features-Based** : chaque fonctionnalité est isolée dans un domaine avec ses composants, hooks, slices Redux, etc.
* Approche **TDD** appliquée dès les premières features : tests unitaires, tests d'intégration, couverture continue.
* Utilisation de **TypeScript fullstack** pour garantir la cohérence des types et la maintenabilité.
* Mise en œuvre d’un **pipeline CI/CD** avec tests automatisés, analyse de code et déploiement Dockerisé.
* Support de **MongoDB** pour l’analyse en temps réel et de **PostgreSQL** pour les données transactionnelles.
* Authentification sécurisée via JWT, conforme RGPD.

---

## Fonctionnalités principales

* **Inscription et connexion** (participants, organisateurs)
* **Création et gestion d’événements** avec suivi des ventes
* **Réservation et génération de billets électroniques**
* **Tableaux de bord analytiques** pour les organisateurs
* **Administration** des utilisateurs et des contenus

---

## Stack technique

| Côté              | Technologies                                |
| ----------------- | ------------------------------------------- |
| Frontend          | React, TypeScript, Chakra UI, Redux Toolkit |
| Backend           | Node.js, Express, TypeScript                |
| BDD relationnelle | PostgreSQL                                  |
| BDD NoSQL         | MongoDB, Redis                              |
| Authentification  | JWT                                         |
| DevOps            | Docker, docker-compose, GitHub Actions      |
| Tests             | Jest, Supertest, TDD                        |

---

## Cas d’usage
- UC1 : Inscription / Connexion / Profil
- UC2 : Création et gestion d’un événement
- UC3 : Réservation d’un billet
- UC4 : Gestion des entrées avec QR Code
- UC5 : Reporting avancé pour les organisateurs

### Liste des tests unitaires

[Tests unitaires](Tests.md)

## Démonstration & dépôt

Le projet est conteneurisé pour une mise en route rapide via `docker-compose`.


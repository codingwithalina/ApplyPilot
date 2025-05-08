# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/87a32753-453e-49bd-87fe-1a9869aac40e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/87a32753-453e-49bd-87fe-1a9869aac40e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/87a32753-453e-49bd-87fe-1a9869aac40e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## ✅ Future Features

- [ ] Lebenslauf erstellen, falls keiner vorhanden ist (mit KI)
- [ ] Assessment Center
- [ ] Mit KI Vorstellungsgespräche üben

# Handling files skipped in bolt

In diesem Projekt werden Binärdateien (Bilder, Icons, Fonts etc.) im `public/`-Ordner in einigen Umgebungen (z. B. Bolt.new Workspace) nicht automatisch importiert oder ausgeliefert. Damit die Assets in Entwicklung und Produktion verfügbar sind, steht folgende Option zur Verfügung:

## 1. über github

Kurz und allgemein gesagt, gehst du so vor, um deine Bilder und Icons öffentlich per URL auszuliefern:

1. **Projekt ins öffentliche Git-Repo packen**  
   Leg dein Projekt (inkl. `public/`-Ordner mit all deinen Assets) auf GitHub oder GitLab – Hauptbranch (z. B. `main`) reicht.

2. **CDN-Link erzeugen**  
   Verwende einen “Git-CDN” wie jsDelivr oder UNPKG. Die allgemeine Form für jsDelivr lautet:
   ```text
   https://cdn.jsdelivr.net/gh/<User>/<Repo>@<Branch>/<Pfad-im-Repo>
   ```
    ***Setz an <User> deinen Nutzernamen, <Repo> den Repo-Namen und <Pfad-im-Repo> den relativen Pfad zur Datei (z. B. public/images/logo.png).***

3. **URLs in deinem Code ersetzen**
   Such überall in HTML-/JSX-/CSS-Dateien nach lokalen Pfaden wie /favicon.ico oder /images/... und tausche sie gegen die erstellten CDN-URLs aus.

4. **App neu starten / deployen**
   Wenn du lokal entwickelst, reicht ein Neustart des Dev-Servers. In der Produktion ziehst du dann keine lokalen public/-Dateien mehr, sondern lädst sie vom CDN.

Damit sind deine Binärdateien (Icons, JPGs, PNGs etc.) weltweit über eine feste URL erreichbar und du musst sie nicht mehr lokal in public/ verwalten.

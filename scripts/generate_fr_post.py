#!/usr/bin/env python3
"""Génère la version FR du post 'Docker AI stack' depuis le JSON EN téléchargé.

Préserve la structure Sanity (mêmes _key, refs d'images, liens, code blocks).
Traduit uniquement : titres, textes de spans, alt d'images, excerpt, SEO, commentaires de sources.
Ré-écrit le postLink pour pointer vers la version FR de 'My local AI stack'.
"""
import json, copy, uuid

SRC = "/workspace/delwiv/portfolio/scripts/data/docker-ai-stack.en.json"
DST = "/workspace/delwiv/portfolio/scripts/data/docker-ai-stack.fr.json"

with open(SRC) as f:
    post = json.load(f)

# --- Traductions par _key de span (robuste, indépendant de l'ordre) ---
SPANS = {
    "183f4ae3ae5c": "Introduction",
    "3f1c3328de75": "Cet article est une version plus courte et actualisée de mon précédent article sur une stack IA basée sur Docker Compose. ",
    "53a31c8dc696": "Il se concentre sur ce que j'utilise principalement : un serveur Llama.cpp, avec une API compatible OpenAI, qui exécute des LLM fine-tunés pour la complétion Fill In the Middle (FIM), et Tabby pour intégrer les complétions dans mon éditeur.",
    "3e70e9e1985d": "J'utilise Linux et j'ai un GPU Nvidia (RTX 3090). Si vous avez un Mac ou un autre type de GPU, dirigez-vous vers ",
    "32658d20b8ea": "https://github.com/ggml-org/llama.cpp/blob/master/docs/docker.md",
    "6fd8229a9d31": " et utilisez la variante d'image `server` correspondante (rocm, vulkan, etc.).",
    "017e186b7b7e": "J'ai installé Docker et Docker Compose, et comme j'utilise un GPU Nvidia, il me fallait aussi le ",
    "c413da6bdef8": "Nvidia Container Toolkit",
    "3d83cc0e8efc": ".",
    "b1545b013848": "Créez un répertoire pour héberger tout ça, j'utiliserai `~/ai-stack` dans cet article",
    "d1467f1df3f2": "D'abord, téléchargez un modèle, je suggère les excellents GGUF d'Unsloth ",
    "a3a5982d1fb8": "huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF",
    "1b7199d18c40": ". J'utilise la variante ",
    "43999ac602c7": "`Q4_K_XL`",
    "ce859bd90337": ". Téléchargez-la dans le dossier `models`.",
    "42cd2c8e6322": "Ensuite, créons notre premier service : le serveur llama",
    "c589aefe4891": "Nous utilisons un contexte de base de 128k tokens, puis RoPE pour le multiplier par 4, et pour économiser de la VRAM nous utilisons la quantification q4_0 pour stocker ce contexte. Cela me permet d'utiliser un contexte théorique de 512k. ",
    "4ad86d90be55": "Si vous rencontrez des erreurs de mémoire insuffisante, réduisez `ctx-size`, `rope-scale`, ou désactivez rope.",
    "7915f4e7f664": "Nous aurons besoin plus tard de quelques centaines de Mo de VRAM libre pour charger un modèle d'embedding pour Tabby, veillez donc à ne pas saturer votre VRAM ici.",
    "6a74833a32e7": "Vous pouvez tester votre serveur llama en lançant le service : ",
    "95b88dd2c9fd": "Laissez-lui quelques dizaines de secondes pour charger le modèle, vous verrez `main: server is listening on http://0.0.0.0:8080 - starting the main loop` quand il sera prêt.",
    "2d935d6b6073": "Rendez-vous sur ",
    "f5ac66e66ac9": "http://localhost:8080",
    "9b3d6ec68003": " et vérifiez que l'interface web est lancée et que vous pouvez discuter avec Qwen 3.",
    "5df20b63572d": "",
    "399b4cb734eb": "Embedding",
    "976f93967d75": "Vous devrez démarrer une 2e instance de llama-server pour embarquer du code : cela permettra à Tabby d'importer certains de vos codebases (ou n'importe quel dépôt GitHub/GitLab/site web) pour améliorer la complétion de code. J'ai téléchargé un modèle d'embedding : ",
    "3dc732e11858": "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF",
    "50f36db9faa3": " (j'ai choisi la version .f16, qui a la meilleure qualité et pèse 274 Mo. Placez-le à côté de l'autre modèle, puis ajoutez un second service llama-server :",
    "304e968d1ef6": " ",
    "410d613a641f": "Cette fois le modèle est chargé en quelques secondes.\n",
    "515dc40c1e55": "Complétion de code : Tabby",
    "66978c0bbfd1": "Sur leur ",
    "ea3bebae3f0d": "GitHub",
    "372243845eec": ", il y a une commande en une ligne pour lancer Tabby avec Docker.",
    "25868c933acd": "Avant de l'utiliser, nous devons indiquer à Tabby d'utiliser notre backend llama.cpp :",
    "f24b9e23056c": "Lancez maintenant Tabby une fois et récupérez le token d'authentification généré :",
    "06941a2cf394": "Rendez-vous maintenant sur ",
    "24a06563d658": "http://localhost:8082",
    "af021038032e": " pour créer un compte et vérifier que Tabby tourne.",
    "b67b0eb761c8": "Cliquez sur votre photo de profil et copiez votre token d'authentification, en omettant le préfixe `auth_`.",
    "4776c0db951d": "Ajoutez le service Tabby dans votre fichier compose (pensez à remplacer $YOUR_AUTH_TOKEN) :",
    "20869a3e692d": "",
    "f1445f5c837c": "Vous pouvez tester la connexion à llama dans la première zone :",
    "5492e954f72d": "Tabby a des plugins pour ",
    "87a925382ae4": "Vim/Neovim",
    "bacc05521764": ", ",
    "d11192aab50b": "Eclipse",
    "326249070144": ", ",
    "d10055d9c5ec": "VSCode",
    "c44ab6dfff0b": " et ",
    "8dca157d06a1": "IntelliJ",
    "b23deb91dd24": ", cliquez sur le lien qui correspond à votre éditeur pour commencer.",
    "13c01be99f28": "Notez que vous devez pointer votre configuration vers http://localhost:8082 où Tabby écoute.",
    "7ff4b957f165": "Pour mon Neovim qui utilise Lazy comme gestionnaire de plugins, c'est aussi simple que ça :",
    "51b3b08f073d": "Vous pouvez vérifier la configuration de votre agent Tabby dans ~/.tabby-client/agent/config.toml.",
    "09eb67a53136": "Et voilà, j'ai maintenant de la complétion de code qui se met à jour à la saisie, que j'accepte avec Control+Entrée",
    "64393eade4b1": "",
    "3b1390daec97": "",
    "ed087af18318": "Fichier Docker Compose complet",
    "5647d11b225a": "",
    "98fff76a065b": "Vous pouvez maintenant tester la stack :",
    "a30fc19b1392": "",
    "7344d4aaf91f": "avante.nvim",
    "ddb56151ddcc": "Si vous utilisez Neovim, vous pouvez jeter un œil à ",
    "4b439b107353": "avante.nvim",
    "537275190c51": " pour intégrer votre LLM comme agent.",
    "ca943bc61ac6": "J'utilise aussi ",
    "864140dd2cc7": "mcphub.nvim",
    "5a86b42f4f14": " pour gérer les serveurs MCP, et les deux plugins s'entendent bien.",
    "c8838040d676": "Voici mon extrait de configuration pour référence (il utilise lazy.nvim).",
    "d105befcc76a": " ",
    "c069589b7048": "Outils supplémentaires",
    "ae633ac2a5d5": "Qwen Code",
    "57bfb4e9a12c": ", un fork de Gemini CLI que vous pouvez brancher sur votre serveur llama.",
    "6c1c7bebcb0b": "OpenCode",
    "ed71f0fd8c51": ", un agent CLI open source, similaire à celui de Qwen",
    "b5fb50bce4eb": "Dans mon article précédent, j'ai ajouté ",
    "c97970ccd335": "Bolt.diy",
    "92bf2fbc54ed": " et ",
    "ea02cf0efa4b": "ComfyUI",
    "16b7568f938a": " à la stack, vous voudrez peut-être y jeter un œil.",
    "9bd269be4aa7": "",
    # Titres de sections (spans dont le _key n'était pas dans la lecture initiale)
    "bca8231fbf79": "Llama.cpp : le backend",
    "e938fb0f42cb": "Plugin pour éditeur de texte",
}

# --- Traductions des alt d'images ---
ALTS = {
    "Test tabby and llama connection": "Tester la connexion entre Tabby et llama",
    "Tabby suggesting fibo JS function": "Tabby suggère une fonction JS fibo",
}

# --- Traductions des commentaires de sources ---
SOURCE_COMMENTS = {
    "Maybe the best source when you are interested in local AI": "Peut-être la meilleure source quand on s'intéresse à l'IA locale",
    "Maybe the second best source": "Peut-être la deuxième meilleure source",
    "The amount of work there is over 9000": "Le volume de travail y est over 9000",
    "Great project, written in Rust so even greater": "Excellent projet, écrit en Rust donc encore meilleur",
}

# --- Nouveau post ---
fr = copy.deepcopy(post)
fr_id = str(uuid.uuid4())
fr["_id"] = fr_id
fr["title"] = "Stack IA Docker"
fr["language"] = "fr"
fr["slug"] = {"_type": "slug", "current": "stack-ia-docker"}
fr["draft"] = False
fr["SEO"] = {
    "_type": "seo",
    "title": "Stack IA Docker",
    "description": "Découvrez comment construire une stack IA locale personnalisable avec le serveur Llama.cpp et Tabby pour la complétion de code.",
}
fr["excerpt"] = ("Découvrez comment construire une stack IA locale personnalisable avec Llama.cpp, et des outils "
    "comme Open Web UI pour des interfaces avancées, Tabby pour la complétion de code, et Comfy UI pour la "
    "conception de workflows. Apprenez à optimiser les performances GPU, à atteindre un contexte de 128k grâce "
    "au ROPE, et à intégrer des modèles d'embedding pour une meilleure compréhension du code. Explorez des "
    "configurations simplifiées avec Docker Compose et des modèles draft pour gagner en vitesse, le tout conçu "
    "pour les développeurs en quête de capacités IA auto-hébergées.   ")

# Nettoyer les champs système qui ne doivent pas être réécrits
for k in ["_createdAt", "_rev", "_system", "_updatedAt"]:
    fr.pop(k, None)

# Traduire le body : spans + alt d'images + postLink
for item in fr["body"]:
    if item.get("_type") == "block":
        for child in item.get("children", []):
            if child.get("_type") == "span" and child.get("_key") in SPANS:
                child["text"] = SPANS[child["_key"]]
    elif item.get("_type") == "image" and item.get("alt") in ALTS:
        item["alt"] = ALTS[item["alt"]]
    elif item.get("_type") == "postLink":
        # Pointer vers la version FR de 'My local AI stack' (stack-ia-locale)
        item["_ref"] = "ae4105e2-75f8-4491-9a9b-08841b6dc602"
        item.pop("title", None)
        item.pop("slug", None)
        item["_type"] = "postLink"
        item["_key"] = item.get("_key", "postLinkFr")

# Traduire les commentaires des sources
for src in fr.get("sources", []):
    for blk in src.get("comment", {}).get("content", []):
        for child in blk.get("children", []):
            if child.get("text") in SOURCE_COMMENTS:
                child["text"] = SOURCE_COMMENTS[child["text"]]

# Enlever les champs issus de la résolution postLink (title/slug résolus) si présents ailleurs
fr.pop("translations", None)

with open(DST, "w") as f:
    json.dump(fr, f, indent=1, ensure_ascii=False)

# Vérif : structure identique (clés) entre EN et FR
def shape(obj):
    if isinstance(obj, dict):
        return {k: shape(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [shape(v) for v in obj]
    return type(obj).__name__

with open(SRC) as f:
    en = json.load(f)

print(f"FR id: {fr_id}")
print(f"FR slug: {fr['slug']['current']}")
print(f"Body blocks: {len(fr['body'])} (EN: {len(en['body'])})")
print(f"Spans traduits: {sum(1 for b in fr['body'] if b.get('_type')=='block' for c in b.get('children',[]) if c.get('_type')=='span')}")
print("Écrit:", DST)

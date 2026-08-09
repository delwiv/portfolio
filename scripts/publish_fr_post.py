#!/usr/bin/env python3
"""Publie la version FR de 'Docker AI stack' dans Sanity + crée le lien de traduction EN<->FR.

Usage: SANITY_WRITE_TOKEN=xxx python3 scripts/publish_fr_post.py
Lit docker-ai-stack.fr.json (généré par generate_fr_post.py).
"""
import json, os, sys, urllib.request, urllib.parse

PROJECT = "a8zazvy5"
DATASET = os.environ.get("SANITY_DATASET", "staging")  # staging par défaut, production quand validé
API = f"https://{PROJECT}.api.sanity.io/v2025-12-08/data/mutate/{DATASET}"
EN_POST_ID = "62064aac-a128-4552-aa58-df6a0404c979"  # Docker AI stack (EN)

def main():
    token = os.environ.get("SANITY_WRITE_TOKEN", "").strip()
    if not token:
        sys.exit("SANITY_WRITE_TOKEN manquant (exportez-le avant de lancer)")
    with open("/workspace/delwiv/portfolio/scripts/data/docker-ai-stack.fr.json") as f:
        fr = json.load(f)
    fr_id = fr["_id"]

    mutations = [
        {"createOrReplace": fr},
        {
            "createOrReplace": {
                "_id": "metadata-stack-ia-docker",
                "_type": "translation.metadata",
                "schemaTypes": ["post"],
                "translations": [
                    {
                        "_key": "en",
                        "_type": "internationalizedArrayReferenceValue",
                        "value": {"_ref": EN_POST_ID, "_type": "reference", "_weak": True},
                    },
                    {
                        "_key": "fr",
                        "_type": "internationalizedArrayReferenceValue",
                        "value": {"_ref": fr_id, "_type": "reference", "_weak": True},
                    },
                ],
            }
        },
    ]

    body = json.dumps({"mutations": mutations}).encode()
    req = urllib.request.Request(
        API,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req) as r:
        result = json.load(r)
    print("Résultat Sanity :")
    print(json.dumps(result, indent=2))
    print(f"\nPost FR créé : https://wildredbeard.tech/fr/blog/stack-ia-docker")

if __name__ == "__main__":
    main()

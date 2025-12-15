import artigos from "@/data/artigos.json"
import { Artigo } from "@/types/Artigo"

export async function getArtigos(): Promise<Artigo[]> {
  return artigos
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  return artigos.find((artigo) => artigo.slug === slug)
}

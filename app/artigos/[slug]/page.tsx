import { notFound } from "next/navigation"
import type { Metadata, PageProps } from "next"
import { getArtigoBySlug, getArtigos } from "@/lib/artigos"

export async function generateStaticParams() {
  const artigos = await getArtigos()

  return artigos.map((artigo) => ({
    slug: artigo.slug
  }))
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = await props.params
  const artigo = await getArtigoBySlug(slug)

  if (!artigo) {
    return {
      title: "Artigo não encontrado"
    }
  }

  return {
    title: artigo.titulo,
    description: artigo.resumo
  }
}

export default async function ArtigoPage(
  props: PageProps
) {
  const { slug } = await props.params
  const artigo = await getArtigoBySlug(slug)

  if (!artigo) return notFound()

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{artigo.titulo}</h1>

      <p>
        <strong>{artigo.autor}</strong> — {artigo.data}
      </p>

      <article style={{ marginTop: "1.5rem" }}>
        {artigo.conteudo}
      </article>

      <a href="/" style={{ display: "inline-block", marginTop: "2rem" }}>
        ← Voltar para Home
      </a>
    </main>
  )
}

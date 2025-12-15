import Link from "next/link"
import { notFound } from "next/navigation"
import { getArtigoBySlug, getArtigos } from "@/lib/artigos"
import type { Metadata } from "next"

/* Geração estática */
export async function generateStaticParams() {
  const artigos = await getArtigos()

  return artigos.map((artigo) => ({
    slug: artigo.slug
  }))
}

/* Metadata dinâmica (Next 15) */
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const artigo = await getArtigoBySlug(slug)

  if (!artigo) {
    return { title: "Artigo não encontrado" }
  }

  return {
    title: artigo.titulo,
    description: artigo.resumo
  }
}

/* Página */
export default async function ArtigoPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const artigo = await getArtigoBySlug(slug)

  if (!artigo) {
    return notFound()
  }

  return (
    <main className="container">
      <h1>{artigo.titulo}</h1>

      <p>
        {artigo.autor} • {artigo.data}
      </p>

      <article style={{ marginTop: "1.5rem" }}>
        {artigo.conteudo}
      </article>

      <Link href="/" className="link">
        ← Voltar para a página inicial
      </Link>
    </main>
  )
}

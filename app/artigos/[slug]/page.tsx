import Link from "next/link"
import { getArtigos, getArtigoBySlug } from "@/lib/artigos"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const artigos = await getArtigos()
  return artigos.map((artigo) => ({ slug: artigo.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug)
  if (!artigo) return {}

  return {
    title: artigo.titulo,
    description: artigo.descricao,
  }
}

export default async function ArtigoPage({
  params,
}: {
  params: { slug: string }
}) {
  const artigo = await getArtigoBySlug(params.slug)
  if (!artigo) return notFound()

  return (
    <main className="container">
      {/* 🔙 LINK DE VOLTAR */}
      <Link href="/" className="link">
        ← Voltar para a página inicial
      </Link>

      <article className="article" style={{ marginTop: "1.5rem" }}>
        <h1>{artigo.titulo}</h1>
        <p>{artigo.autor} • {artigo.data}</p>
        <p>{artigo.conteudo}</p>
      </article>
    </main>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { getArtigoBySlug } from "@/lib/artigos"

export default async function ArtigoPage(
  { params }: { params: { slug: string } }
) {
  const artigo = await getArtigoBySlug(params.slug)

  if (!artigo) {
    return notFound()
  }

  return (
    <main className="container">
      <h1>{artigo.titulo}</h1>

      <p>
        {artigo.autor} • {artigo.data}
      </p>

      <p>{artigo.conteudo}</p>

      <Link href="/" className="link">
        ← Voltar para a página inicial
      </Link>
    </main>
  )
}

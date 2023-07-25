import Hero from "@/components/Hero";
import ArticleCard from "@/components/Article";
import getPosts from "@/actions/getPosts";

interface ISearchParams {
  cat?: string;
}
interface HomeProps {
  searchParams: ISearchParams
}
export default async function Home( { searchParams }: HomeProps ) {

  const posts = await getPosts(searchParams);

  return (
    <main className="overflow-x-hidden pb-8">
      <Hero />
      {
        posts && posts.length > 0
        ?
            <div
                id="articles"
                className="
                  container
                  pt-24
                  pb-20
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  2xl:grid-cols-4
                  gap-8
                "
            >
              {
                  posts.map((post) => (
                      <ArticleCard key={post.id} post={post} />
                  ))
              }
            </div>

        : <div className="flex justify-center">We have no posts!</div>
      }

    </main>
  )
}

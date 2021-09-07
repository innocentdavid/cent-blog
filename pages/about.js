import Image from 'next/image'
import Link from 'next/link'
import HeadMetadata from '../components/HeadMetadata'

function about() {
  return (<>
    <HeadMetadata title='About me (cent) | Cent Blog' metaDescription="About me (cent)" />

    <main className="parent">
      <div className="left"></div>
      <div className="middle posts">
        <center><h2>Paul Innocent David (cent)</h2></center>

        <div className="centImg">
          <Image src="/cent.jpg" alt="Paul Innocnet David (cent)" width="300px" height="350px" />
        </div>

        <br />

        <h4>Hi, I&#39;m Paul Innocent.</h4>

        <p>I help people understand software development. I love pets too and tech stuff</p>

        <p>I&#39;m a full stack software developer. I write about modern Node.js, JavaScript, and development.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe consequatur tempora, deserunt reprehenderit minus rerum tempore dicta commodi quod nostrum.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat blanditiis voluptate mollitia nulla culpa deserunt adipisci? Ullam praesentium distinctio voluptatem corporis, ratione soluta architecto alias exercitationem pariatur, odit quis nisi rem dolores amet obcaecati error ex eius dolorem, assumenda ipsum.</p>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, quas possimus eligendi a doloribus in aperiam asperiores velit architecto ipsum, labore doloremque! Beatae hic nulla cum, natus omnis nobis voluptate fugit debitis mollitia voluptatibus quisquam impedit! Mollitia rerum aliquid reiciendis quae, tenetur explicabo repudiandae, sapiente consequatur eaque facere similique officiis omnis. Aliquam magnam qui excepturi.</p>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique sed mollitia provident facere exercitationem fugiat.</p>

        <div>social handles & tel</div>

        <center><Link href="/contact"><a><button className="btnSolid">contact me</button></a></Link></center>
      </div>
    </main>

    <br />
    <br />
  </>)
}

export default about

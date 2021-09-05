import Footer from "../components/Footer.js"
import HeadMetadata from "../components/HeadMetadata"

export default function Error({ statusCode }) {

  return (
    <div className="layout-wrapper">
      <HeadMetadata
        title="Error | Coding Blog"
      />
      
      <div className="error-container">
        {
          statusCode === 404 ?
            <>
              <h1>404 Page Not Found</h1>
              <p>We can&#39;t seem to find the page you&#39;re looking for.</p>
            </> :
            <>
              <h1>An Error Occurred</h1>
              <p>An error occurred when trying to fulfill your request. Please try reloading the page or going back to the homepage.</p>
            </>
        }
      </div>

      <Footer />
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

// export function getInitialProps({ req, res, err }) {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : null

//     return {
//       statusCode: statusCode
//     }
//   }

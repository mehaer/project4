'use client'
import { useEffect, useState  } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Box, CircularProgress, Container, Typography } from "@mui/material"

const ResultPage =  () =>{
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
         const fetchCheckoutSession = async () =>{
            if(!sessionId) return
            
            try {
                const res = await fetch (`/api/checkout_session?session_id=${sessionId}`)
                const sessionData = await res.json() 
                if(res.ok){
                    setSession(sessionData)
                }
                else{
                    setErrors(sessionData.error )
                }
            } 
            catch (err) {
                setError("An error occurred")
            }
            finally{
                setLoading(false)
            }
        } 
        fetchCheckoutSession()
    }, [sessionId])

    if(loading){
        return(
            <Container maxWidth = '100vw' sx = {{
                textAlign: 'center', mt:4,
            }}>
                 <CircularProgress/>
                 <Typography variant="h6">
                     Loading
                 </Typography>
            </Container>
        )
    }
    if(error){
        return(
            <Container maxWidth = '100vw' sx = {{
                textAlign: 'center',
                mt:4,
            }}>
                <Typography variant="h6">
                    {error}
                </Typography>
            </Container>
        )
    }
    return(
        <Container maxWidth = '100vw' sx = {{
            textAlign: 'center',
            mt:4,
        }}>
            {
                session.payment_status === "paid" ? (
                    <>
                    <Typography>Thank you for purchasing</Typography>
                    <Box sx = {{mt:22}}>
                        <Typography variant="h6">
                            Session Id : {sessionId}
                        </Typography>
                        <Typography variant="body1">
                            We have received your payment, you will receive an email with your payment details shortly.
                        </Typography>
                    </Box>
                    </>
                ):(
                    <>  <Typography>Payment Failed</Typography>
                    <Box sx = {{mt:22}}>
                        <Typography variant="h6">
                            Session Id : {sessionId}
                        </Typography>
                        <Typography variant="body1">
                           Your payment was not successful, please try again.
                        </Typography>
                    </Box></>
                )}
        </Container>
    )
}

export default ResultPage
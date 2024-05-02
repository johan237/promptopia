'use client';
import { Suspense } from 'react'

import {useEffect, useState} from 'react'
import  {useSession} from 'next-auth/react'
import {useRouter, useSearchParams} from 'next/navigation'

import Form from "@components/Form"

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const {data:session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const getPromptDetails = async() =>{
            const response = await fetch(`/api/prompt/${promptId}`)

            const data  = await response.json()
            console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        console.log(promptId)
        if(promptId) {
            console.log(promptId);
            getPromptDetails()}
    },[promptId])

    const updatePrompt = async(e) => {
        console.log('trying my best')
        e.preventDefault();
        setSubmitting(true)

        if(!promptId) { return alert('Prompt ID not found')}
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
  return (
    <Suspense fallback={<Form />}>
    <Form 
        type="Edit"
        post= {post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit = {updatePrompt}
    />
    </Suspense>
  )
}

export default EditPrompt

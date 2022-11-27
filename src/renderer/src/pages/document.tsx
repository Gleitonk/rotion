import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Document as DocumentProps } from '@shared/types/ipc'
import { Editor, OnContentupdateParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient()


    const { data, isFetching } = useQuery(['document'], async () => {
        const response = await window.api.fetchDocument({ id: id! })
        return response.data
    })

    const { mutateAsync: savedocument } = useMutation(async ({ title, content }: OnContentupdateParams) => {
        await window.api.saveDocument({
            id: id!,
            title,
            content
        })
    }, {
        onSuccess: (_, { title }) => {
            queryClient.setQueryData<DocumentProps[]>(['documents'], (documents) => {
                return documents?.map(document => {
                    if (document.id === id) {
                        return [...documents, title]
                    }
                    return document
                })
            })
        }
    })

    const initialContent = useMemo(() => {
        if (data) {
            return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
        }
        return ''
    }, [data])

    function handleEditorContentUpdated({ title, content }: OnContentupdateParams) {
        savedocument({ title, content })
    }

    return (
        <main className="flex-1 flex py-12 px-10 gap-8">
            <aside className="hidden lg:block sticky top-0">
                <span className="text-rotion-300 font-semibold text-xs">
                    TABLE OF CONTENT
                </span>

                <ToC.Root>
                 
                </ToC.Root>

            </aside>

            <section className='flex-1 flex flex-col items-center'>
                {!isFetching && data &&
                    <Editor
                        content={initialContent}
                        onContentUpdated={handleEditorContentUpdated}
                    />
                }
            </section>
        </main>
    )
}

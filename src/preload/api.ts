import { ipcRenderer } from 'electron'

import { IPC } from '@shared/constants/ipc'

import {
    CreateDocumentResponse,
    DeleteDocumentArgs,
    GetAllDocumentsResponse,
    GetDocumentArgs,
    GetDocumentResponse,
    SaveDocumentArgs,
} from '@shared/types'


export const api = {
    getDocuments(): Promise<GetAllDocumentsResponse> {
        return ipcRenderer.invoke(IPC.DOCUMENTS.GET_ALL)
      },
      getDocument(args: GetDocumentArgs): Promise<GetDocumentResponse> {
        return ipcRenderer.invoke(IPC.DOCUMENTS.GET, args)
      },
      createDocument(): Promise<CreateDocumentResponse> {
        return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
      },
      saveDocument(args: SaveDocumentArgs) {
        return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, args)
      },

    onNewDocumentRequest(callback: () => void) {
        ipcRenderer.on(IPC.DOCUMENTS.NEW_DOCUMENT, callback)

        return () => ipcRenderer.off(IPC.DOCUMENTS.NEW_DOCUMENT, callback)
    },
}
import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import { FetchAllDocumentsResponse } from '@shared/types/ipc'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, async (_): Promise<FetchAllDocumentsResponse> => {
    return {
        data: [
            { id: '1', title: 'Ignite', content: '' },
            { id: '2', title: 'Metodologia', content: '' },
            { id: '3', title: 'Trabalho', content: '' },
            { id: '4', title: 'Documentacao', content: '' }
        ]
    }
})
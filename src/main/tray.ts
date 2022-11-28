import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'path'
import { IPC } from '@shared/constants/ipc'

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate.png'),
  )

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    {
      type: 'separator',
    },
    {
      label: 'Criar novo documento',
      click: () => window.webContents.send(IPC.DOCUMENTS.NEW_DOCUMENT),
    },
    {
      type: 'separator',
    },
    {
      label: 'Documentos recentes',
      click: () => window.webContents.send('new-document'),
    },
    {
      label: 'Rotion',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Metodologia',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'AOC',
      accelerator: 'CommandOrControl+3',
      acceleratorWorksWhenHidden: false,
    },
    { type: 'separator' },
    {
      label: 'Sair',
      role: 'quit',
    },
  ])

  tray.setContextMenu(menu)
}

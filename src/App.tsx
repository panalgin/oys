import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { FileIcon, BarChartIcon, PersonIcon, ClipboardIcon } from '@radix-ui/react-icons'
import CSVUpload from "./components/csv-upload"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <ScrollArea.Root className="w-64 bg-white shadow-md">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Sıralama Takibi</h1>
            <Tabs.Root className="flex flex-col" defaultValue="csv-upload">
              <Tabs.List className="flex flex-col space-y-2" aria-label="Manage your account">
                <Tabs.Trigger
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  value="csv-upload"
                >
                  <FileIcon className="w-5 h-5 mr-2" />
                  CSV Yükleme
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  value="statistics"
                >
                  <BarChartIcon className="w-5 h-5 mr-2" />
                  İstatistikler
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  value="students"
                >
                  <PersonIcon className="w-5 h-5 mr-2" />
                  Öğrenciler
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  value="exams"
                >
                  <ClipboardIcon className="w-5 h-5 mr-2" />
                  Sınavlar
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-[160ms] ease-out hover:bg-gray-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <main className="flex-1 p-4 overflow-auto">
        <Tabs.Root className="flex flex-col w-full h-full" defaultValue="csv-upload">
          <Tabs.Content className="flex-grow" value="csv-upload">
            <CSVUpload />
          </Tabs.Content>
          <Tabs.Content className="flex-grow p-6 bg-white rounded-lg shadow-md" value="statistics">
            <h2 className="text-2xl font-bold mb-4">İstatistikler</h2>
            <p>İstatistik bilgileri burada gösterilecek.</p>
          </Tabs.Content>
          <Tabs.Content className="flex-grow p-6 bg-white rounded-lg shadow-md" value="students">
            <h2 className="text-2xl font-bold mb-4">Öğrenciler</h2>
            <p>Öğrenci listesi burada gösterilecek.</p>
          </Tabs.Content>
          <Tabs.Content className="flex-grow p-6 bg-white rounded-lg shadow-md" value="exams">
            <h2 className="text-2xl font-bold mb-4">Sınavlar</h2>
            <p>Sınav listesi burada gösterilecek.</p>
          </Tabs.Content>
        </Tabs.Root>
      </main>
    </div>
  )
}
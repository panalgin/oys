import React, { useState, useRef } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { UploadIcon } from '@radix-ui/react-icons'

interface Student {
  studentNumber: string;
  name: string;
  class: string;
  ranking: number;
}

export default function CSVUpload() {
  const [students, setStudents] = useState<Student[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setError(null)

    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result
        if (typeof text === 'string') {
          try {
            const lines = text.split('\n')
            const parsedStudents: Student[] = lines.slice(1).map(line => {
              const [studentNumber, name, classRoom, ranking] = line.split(',')
              if (!studentNumber || !name || !classRoom || !ranking) {
                throw new Error('Invalid CSV format')
              }
              return {
                studentNumber: studentNumber.trim(),
                name: name.trim(),
                class: classRoom.trim(),
                ranking: parseInt(ranking.trim(), 10)
              }
            }).filter(student => student.studentNumber !== '')
            setStudents(parsedStudents)
          } catch (error) {
            setError('CSV dosyası işlenirken bir hata oluştu. Lütfen dosya formatını kontrol edin.')
            setStudents([])
          }
        }
      }
      reader.readAsText(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">CSV Dosyası Yükleme</h2>
      <div className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UploadIcon className="w-5 h-5 mr-2" />
            Dosya Seç
          </button>
          {fileName && (
            <span className="ml-3 text-sm text-gray-500">{fileName}</span>
          )}
        </div>
        
        {error && (
          <AlertDialog.Root open={!!error}>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
              <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full">
                <AlertDialog.Title className="text-lg font-medium text-gray-900 mb-2">
                  Hata
                </AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-500 mb-4">
                  {error}
                </AlertDialog.Description>
                <div className="flex justify-end">
                  <AlertDialog.Cancel asChild>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setError(null)}
                    >
                      Tamam
                    </button>
                  </AlertDialog.Cancel>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        )}

        {students.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Yüklenen Öğrenciler</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Öğrenci Numarası
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Öğrenci Adı ve Soyadı
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sınıfı
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sıralaması
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.ranking}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
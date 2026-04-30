import CustomCursor from '@/components/layout/CustomCursor'
import Ticker from '@/components/ui/Ticker'
import ThemeProvider from '@/providers/ThemeProvider'
import LabsFab from '@/components/labs/LabsFab'
import LabsOverlay from '@/components/labs/LabsOverlay'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Ticker />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', paddingTop: 30 }}>
        {children}
      </div>
      <LabsFab />
      <LabsOverlay />
    </ThemeProvider>
  )
}

import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowCounterClockwise, Code, Eye, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Exercise {
  id: string
  title: string
  description: string
  initialHtml: string
  initialCss: string
  goal: string
  concepts: string[]
}

const exercises: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Il tuo primo box colorato',
    description: 'Crea un semplice box con un colore di sfondo.',
    initialHtml: '<div class="box">\n  Ciao mondo!\n</div>',
    initialCss: '.box {\n  \n}',
    goal: 'Aggiungi le proprietà CSS: background-color, padding (20px), e border-radius (10px)',
    concepts: ['background-color', 'padding', 'border-radius']
  },
  {
    id: 'ex-2',
    title: 'Testo stilizzato',
    description: 'Impara a dare stile al testo con CSS.',
    initialHtml: '<div class="container">\n  <h1 class="title">Il mio titolo</h1>\n  <p class="text">Questo è un paragrafo di esempio.</p>\n</div>',
    initialCss: '.title {\n  \n}\n\n.text {\n  \n}',
    goal: 'Stilizza il titolo con color, font-size (32px), font-weight (bold). Stilizza il testo con color, font-size (16px), line-height (1.6)',
    concepts: ['color', 'font-size', 'font-weight', 'line-height']
  },
  {
    id: 'ex-3',
    title: 'Centrare gli elementi',
    description: 'Impara a centrare un elemento nella pagina.',
    initialHtml: '<div class="container">\n  <div class="centered-box">\n    Sono centrato!\n  </div>\n</div>',
    initialCss: '.container {\n  \n}\n\n.centered-box {\n  \n}',
    goal: 'Usa flexbox: nel container imposta display: flex, justify-content: center, align-items: center, min-height: 200px. Nel box aggiungi padding e background-color',
    concepts: ['display', 'flexbox', 'justify-content', 'align-items']
  },
  {
    id: 'ex-4',
    title: 'Bordi e ombre',
    description: 'Aggiungi profondità con bordi e ombre.',
    initialHtml: '<div class="card">\n  <h3>Card elegante</h3>\n  <p>Con bordi e ombre.</p>\n</div>',
    initialCss: '.card {\n  \n}',
    goal: 'Aggiungi border (2px solid #ddd), border-radius (15px), box-shadow (0 4px 10px rgba(0,0,0,0.1)), padding (20px)',
    concepts: ['border', 'box-shadow', 'rgba colors']
  }
]

function App() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [html, setHtml, deleteHtml] = useKV<string>(`html-${exercises[currentExercise].id}`, exercises[currentExercise].initialHtml)
  const [css, setCss, deleteCss] = useKV<string>(`css-${exercises[currentExercise].id}`, exercises[currentExercise].initialCss)
  const [completed, setCompleted] = useKV<string[]>('completed-exercises', [])

  const exercise = exercises[currentExercise]

  const handleReset = () => {
    setHtml(exercise.initialHtml)
    setCss(exercise.initialCss)
    toast.success('Codice ripristinato!')
  }

  const handleExerciseChange = (index: number) => {
    setCurrentExercise(index)
    const newExercise = exercises[index]
    setHtml(newExercise.initialHtml)
    setCss(newExercise.initialCss)
  }

  const handleMarkComplete = () => {
    setCompleted((current) => {
      if (!current?.includes(exercise.id)) {
        return [...(current || []), exercise.id]
      }
      return current
    })
    toast.success('Esercizio completato! 🎉')
  }

  const previewContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            margin: 0; 
            padding: 20px; 
            font-family: 'Inter', sans-serif;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                HTML & CSS Learning Lab
              </h1>
              <p className="text-muted-foreground mt-2">
                Impara HTML e CSS attraverso esercizi pratici interattivi
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="gap-2 self-start md:self-center">
              <ArrowCounterClockwise size={18} />
              Reset
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {exercises.map((ex, idx) => (
              <Button
                key={ex.id}
                onClick={() => handleExerciseChange(idx)}
                variant={currentExercise === idx ? 'default' : 'outline'}
                size="sm"
                className="relative"
              >
                esercizio {idx + 1}
                {completed?.includes(ex.id) && (
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="absolute -top-1 -right-1 text-accent"
                  />
                )}
              </Button>
            ))}
          </div>
        </header>

        <Card className="p-6 space-y-4 bg-card">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">{exercise.title}</h2>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {exercise.concepts.map((concept) => (
              <Badge key={concept} variant="secondary">
                {concept}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-accent">
            <p className="text-sm font-medium text-foreground">
              <strong>Obiettivo:</strong> {exercise.goal}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleMarkComplete} className="gap-2 bg-accent hover:bg-accent/90">
              <CheckCircle size={18} />
              Segna come completato
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="p-6 space-y-4 bg-card">
              <div className="flex items-center gap-2 text-foreground">
                <Code size={24} weight="bold" />
                <h3 className="text-lg font-semibold">HTML</h3>
              </div>
              <Textarea
                id="html-editor"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="font-mono text-sm min-h-[200px] resize-none"
                placeholder="Scrivi il tuo HTML qui..."
              />
            </Card>

            <Card className="p-6 space-y-4 bg-card">
              <div className="flex items-center gap-2 text-foreground">
                <Code size={24} weight="bold" />
                <h3 className="text-lg font-semibold">CSS</h3>
              </div>
              <Textarea
                id="css-editor"
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="font-mono text-sm min-h-[300px] resize-none"
                placeholder="Scrivi il tuo CSS qui..."
              />
            </Card>
          </div>

          <Card className="p-6 space-y-4 bg-card lg:sticky lg:top-8 lg:self-start">
            <div className="flex items-center gap-2 text-foreground">
              <Eye size={24} weight="bold" />
              <h3 className="text-lg font-semibold">Anteprima live</h3>
            </div>
            <div className="border-2 border-border rounded-lg overflow-hidden bg-white min-h-[500px]">
              <iframe
                srcDoc={previewContent}
                title="preview"
                className="w-full h-full min-h-[500px]"
                sandbox="allow-scripts"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
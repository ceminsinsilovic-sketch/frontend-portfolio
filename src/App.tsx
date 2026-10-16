import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Atom,
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  PanelsTopLeft,
  SquareTerminal,
  Sparkle,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import StackingCards, { StackingCardItem } from './components/ui/stacking-cards'

type ProjectCategory = 'Брендинг' | 'Цифровые продукты' | 'Кампании'

type Project = {
  id: number
  title: string
  client: string
  type: string
  category: ProjectCategory
  year: string
  intro: string
  result: string
  metric: string
  tags: string[]
  art: string
  accent: string
}

type ToolItem = {
  name: string
  icon?: LucideIcon
  mark?: string
}

const videos = {
  background: '/hero-creator.mp4',
  software:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4',
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Астер Хаус',
    client: 'Концепция / бутик-отель',
    type: 'Визуальная система + сайт',
    category: 'Брендинг',
    year: '2024',
    intro: 'Тёплая и спокойная айдентика для нового городского пространства с характером дома.',
    result: 'Собрал визуальный язык, который одинаково уверенно работает в интерфейсе, печати и пространстве.',
    metric: '01 / Атмосфера',
    tags: ['Позиционирование', 'Айдентика', 'Редактура'],
    art: 'art-aster',
    accent: '#f0cba0',
  },
  {
    id: 2,
    title: 'Поток',
    client: 'Концепция / wellness-продукт',
    type: 'Продуктовая стратегия + UI-система',
    category: 'Цифровые продукты',
    year: '2024',
    intro: 'Спокойный цифровой продукт для тех, кто выстраивает привычки без лишнего шума.',
    result: 'Сделал прогресс понятным, тактильным и достаточно лёгким, чтобы к нему хотелось возвращаться.',
    metric: '02 / Ясность',
    tags: ['UX-направление', 'Прототипирование', 'Интерфейс'],
    art: 'art-flow',
    accent: '#b9ff55',
  },
  {
    id: 3,
    title: 'Добрая почва',
    client: 'Концепция / сеть фермерских проектов',
    type: 'Нейминг + айдентика',
    category: 'Брендинг',
    year: '2023',
    intro: 'Оптимистичная система для проекта, который делает регенеративное земледелие понятнее.',
    result: 'Вернул в центр истории людей и землю, избежав привычной стилизации под «деревенский» бренд.',
    metric: '03 / Основа',
    tags: ['Нейминг', 'Арт-дирекшн', 'Упаковка'],
    art: 'art-soil',
    accent: '#e3ff78',
  },
  {
    id: 4,
    title: 'Северная линия',
    client: 'Концепция / тревел-журнал',
    type: 'Редакционная платформа + кампания',
    category: 'Кампании',
    year: '2023',
    intro: 'Чёткий голос для журнала о путешествиях, где важнее путь, чем список обязательных мест.',
    result: 'Выстроил единый ритм для печати, видео и быстрого цифрового формата историй.',
    metric: '04 / В движении',
    tags: ['Кампания', 'Редактура', 'Моушн'],
    art: 'art-northline',
    accent: '#b7ddff',
  },
  {
    id: 5,
    title: 'Синдер',
    client: 'Концепция / лаборатория материалов',
    type: 'Нейминг + запуск продукта',
    category: 'Цифровые продукты',
    year: '2022',
    intro: 'Цифровой запуск лаборатории, превращающей производственные отходы в новые материалы.',
    result: 'Перевёл сложное исследование в историю, которую можно почувствовать ещё до подробного объяснения.',
    metric: '05 / Материя',
    tags: ['Нарратив', 'Веб-дизайн', '3D-направление'],
    art: 'art-cinder',
    accent: '#ff9f65',
  },
  {
    id: 6,
    title: 'Воскресная служба',
    client: 'Концепция / современная пекарня',
    type: 'Айдентика + точки контакта',
    category: 'Кампании',
    year: '2022',
    intro: 'Игривый, но взрослый образ для районной пекарни, ради которой приятно немного постоять в очереди.',
    result: 'Добавил ежедневным ритуалам немного театра в меню, упаковке, вывеске и социальных форматах.',
    metric: '06 / Ритуал',
    tags: ['Айдентика', 'Упаковка', 'Запуск'],
    art: 'art-sunday',
    accent: '#ff8eb6',
  },
]

const iconRows: ToolItem[][] = [
  [{ name: 'Python', mark: 'Py' }, { name: 'Код', icon: Code2 }, { name: 'React', icon: Atom }, { name: 'Терминал', icon: SquareTerminal }, { name: 'Git', icon: GitBranch }, { name: 'База данных', icon: Database }, { name: 'HTML / CSS', icon: FileCode2 }, { name: 'UI', icon: PanelsTopLeft }],
  [{ name: 'TypeScript', mark: 'TS' }, { name: 'Код', icon: Braces }, { name: 'React', icon: Atom }, { name: 'API', icon: SquareTerminal }, { name: 'Git', icon: GitBranch }, { name: 'База данных', icon: Database }, { name: 'HTML / CSS', icon: FileCode2 }, { name: 'Компоненты', icon: PanelsTopLeft }],
]

function Label({ children, align = 'center' }: { children: ReactNode; align?: 'left' | 'center' }) {
  return (
    <div className={`section-label justify-${align}`}>
      <Sparkle aria-hidden="true" />
      <span>{children}</span>
      <Sparkle aria-hidden="true" />
    </div>
  )
}

function VideoLayer({ src, className = '', pingPong = false }: { src: string; className?: string; pingPong?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !pingPong) return

    let direction = 1
    let animationFrame = 0
    let previousTime = performance.now()

    const tick = (now: number) => {
      const delta = Math.min((now - previousTime) / 1000, 0.05)
      previousTime = now

      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime += direction * delta
        if (video.currentTime >= video.duration - 0.04) {
          video.currentTime = video.duration - 0.04
          direction = -1
        } else if (video.currentTime <= 0.04) {
          video.currentTime = 0.04
          direction = 1
        }
      }

      animationFrame = requestAnimationFrame(tick)
    }

    video.pause()
    animationFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrame)
  }, [pingPong])

  return <video ref={videoRef} aria-hidden="true" autoPlay={!pingPong} loop={!pingPong} muted playsInline preload="auto" className={`absolute inset-0 h-full w-full object-cover ${className}`} src={src} />
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={`project-art ${project.art}`} style={{ '--accent': project.accent } as CSSProperties}>
      <div className="art-grid" />
      <div className="art-orbit" />
      <div className="art-orbit art-orbit-small" />
      <span className="art-mark">{String(project.id).padStart(2, '0')}</span>
      <span className="art-caption">{project.category}</span>
    </div>
  )
}

function MarqueeRow({ icons, reverse = false }: { icons: ToolItem[]; reverse?: boolean }) {
  const sequence = [...icons, ...icons]
  return (
    <div className="marquee-mask">
      <div className={reverse ? 'marquee-track animate-marquee-right' : 'marquee-track animate-marquee-left'}>
        {sequence.map((tool, index) => {
          const Icon = tool.icon
          return (
            <div aria-label={tool.name} className="software-icon liquid-glass" key={`${tool.name}-${index}`} title={tool.name}>
              {Icon ? <Icon aria-hidden="true" strokeWidth={1.5} /> : <span aria-hidden="true" className="tool-mark">{tool.mark}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StackingProjectCard({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  return (
    <button className="stacking-project-card group text-left" onClick={() => onSelect(project)} type="button">
      <ProjectArtwork project={project} />
      <div className="flex flex-1 flex-col justify-between gap-8 p-1 md:p-5">
        <div>
          <p className="eyebrow text-[#d8ff5f]">{project.metric}</p>
          <h3 className="mt-3 text-3xl font-normal tracking-tight transition group-hover:text-[#d8ff5f] sm:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">{project.intro}</p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Состав работы</p><p className="mt-2 text-sm text-white/80">{project.type}</p><div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-white/35">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition group-hover:border-[#d8ff5f] group-hover:bg-[#d8ff5f] group-hover:text-black"><ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /></span>
        </div>
      </div>
    </button>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const categories = ['Все', 'Брендинг', 'Цифровые продукты', 'Кампании']
  const filteredProjects = useMemo(
    () => (activeCategory === 'Все' ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory],
  )

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject])

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#d8ff5f] selection:text-black">
      <section className="relative px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-7 md:px-10 md:pb-24 lg:min-h-screen lg:px-14 lg:pb-14">
        <div className="mx-auto max-w-[1500px]">
          <nav className="mb-16 flex items-center justify-between sm:mb-24">
            <a className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 transition hover:text-white" href="#top">КОД / ДЕТАЛИ</a>
            <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/45 sm:flex"><a className="transition hover:text-white" href="#work">Проекты</a><a className="transition hover:text-white" href="#about">Подход</a></div>
            <a className="liquid-glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/80 transition hover:bg-white/10 hover:text-white sm:px-5 sm:py-2.5" href="#work">Смотреть проекты <ArrowUpRight aria-hidden="true" className="ml-1 inline h-3.5 w-3.5" strokeWidth={1.5} /></a>
          </nav>

          <div id="top" className="mb-7 flex flex-col justify-between gap-7 md:mb-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#d8ff5f]">Frontend-разработка / сайты / интерфейсы</p>
              <h1 className="max-w-3xl text-[28px] font-normal leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]">Frontend-разработчик для сайтов и цифровых продуктов.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-[1.6] text-white/60 md:text-[15px]">Больше 4 лет собираю понятные интерфейсы, адаптивные сайты и интерактивные решения на React и TypeScript — от первой структуры до аккуратного запуска.</p>
            </div>
            <a className="group hidden shrink-0 items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/50 transition hover:text-white lg:flex" href="#work">Листать проекты <ArrowDown aria-hidden="true" className="h-4 w-4 transition group-hover:translate-y-1" strokeWidth={1.5} /></a>
          </div>

          <div className="feature-grid">
            <article className="feature-card video-card min-h-[440px] lg:min-h-0"><VideoLayer pingPong src={videos.background} /><div className="video-vignette" /><div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6"><div className="max-w-xl"><Label align="left">Кто я</Label><p className="mt-4 text-[12px] leading-[1.65] text-white/85 md:text-[13px]">Я работаю с веб-интерфейсами, сайтами и цифровыми продуктами. В веб-разработке я больше четырёх лет: собираю страницы, личные кабинеты, промо-сайты, интерактивные секции и небольшие продуктовые системы. Уверенно чувствую себя в React, TypeScript, Tailwind CSS, адаптивной вёрстке, компонентном подходе и анимациях. Могу подключиться, когда нужен новый сайт с нуля, привести в порядок существующий интерфейс или превратить дизайн в рабочий фронтенд. Также умею продумывать мобильную версию, состояния компонентов и повторно используемые блоки. Обычно работаю с макетом, готовой логикой или коротким описанием задачи: задаю вопросы, предлагаю понятный вариант и довожу его до состояния, которое можно показывать людям. В разделе «Проекты» собраны разные концепции — там можно посмотреть, как я работаю со структурой, визуальным ритмом и интерактивностью.</p></div></div></article>

            <div className="feature-stack"><article className="feature-card noise-overlay bg-[#324444] p-5 md:p-6"><Label align="left">Опыт</Label><div className="mt-12 max-w-md md:mt-20"><p className="text-[13px] leading-[1.6] text-white/85 sm:text-[13.5px]">Больше 4 лет во фронтенд-разработке. Собираю сайты и интерфейсы, где визуальная идея поддерживается аккуратным, понятным кодом.</p><p className="mt-5 text-xs leading-5 text-white/55">React · TypeScript · Tailwind</p></div></article><article className="feature-card noise-overlay flex min-h-[250px] flex-col justify-between bg-[#324444] p-5 text-left md:p-6"><Label align="left">Что умею</Label><div className="grid gap-2 text-sm text-white/80"><span>Лендинги и портфолио</span><span>Интерфейсы и личные кабинеты</span><span>Анимации и адаптивная вёрстка</span></div></article></div>

            <div className="feature-stack"><article className="feature-card video-card min-h-[390px] lg:min-h-0"><VideoLayer src={videos.software} className="opacity-70" /><div className="video-vignette" /><div className="relative z-10 flex h-full flex-col justify-between py-5 md:py-6"><div className="px-5 md:px-6"><Label>Инструменты</Label></div><div className="space-y-3 pb-1"><MarqueeRow icons={iconRows[0]} /><MarqueeRow icons={iconRows[1]} reverse /></div></div></article><article className="feature-card noise-overlay flex min-h-[180px] flex-col justify-between bg-[#324444] p-5 md:p-6"><Label align="left">Могу взять</Label><div className="grid gap-2 text-sm text-white/75"><span>Новый сайт с нуля</span><span>Перевод дизайна в код</span><span>Доработка интерфейса</span></div></article></div>
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28 md:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><div className="mb-10 flex flex-col justify-between gap-7 lg:mb-14 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="eyebrow">Проекты / 06</p><h2 className="mt-4 text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">Шесть разных задач. Один внимательный подход.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/55">Небольшая коллекция концепций — чтобы было видно, как меняется решение, когда меняется контекст.</p></div><div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр проектов">{categories.map((category) => <button key={category} className={`filter-pill ${activeCategory === category ? 'is-active' : ''}`} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}</div></div><div className="stacking-cards-shell"><StackingCards className="relative" totalCards={filteredProjects.length} scaleMultiplier={0.035}>{filteredProjects.map((project, index) => <StackingCardItem key={project.id} index={index} topPosition={`${4 + index * 2}%`} className="h-[560px] md:h-[620px]"><StackingProjectCard project={project} onSelect={setSelectedProject} /></StackingCardItem>)}</StackingCards></div></div></section>

      <section id="about" className="border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28 md:px-10 lg:px-14"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24"><div><p className="eyebrow">Для заказчика</p><p className="mt-6 max-w-sm text-2xl font-light leading-tight tracking-tight text-white/90 sm:text-3xl">Понятный фронтенд, который можно развивать дальше.</p></div><div className="grid gap-8 text-sm leading-7 text-white/55 sm:grid-cols-2 sm:gap-12"><p>Подключаюсь к задаче на этапе идеи, дизайна или уже готового проекта. Помогаю собрать структуру, привести интерфейс к единому виду и довести детали до запуска.</p><p>В результате у заказчика остаётся не только красивая страница, но и аккуратная база: компоненты, состояния, адаптив и понятная логика.</p></div></div></section>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 md:px-10 lg:px-14"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex-row"><span>Frontend-разработка / цифровые продукты</span><span>© 2026 / Собрано с вниманием</span><span>React · TypeScript · Tailwind</span></div></footer>

      {selectedProject && <div aria-modal="true" className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProject(null) }}><div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#131313] p-5 shadow-2xl sm:p-8"><button aria-label="Закрыть кейс" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:bg-white/10 hover:text-white" onClick={() => setSelectedProject(null)} type="button"><X aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /></button><ProjectArtwork project={selectedProject} /><div className="mt-7 grid gap-8 sm:grid-cols-[1.15fr_0.85fr]"><div><p className="eyebrow text-[#d8ff5f]">{selectedProject.category} / {selectedProject.year}</p><h2 className="mt-3 text-4xl font-normal tracking-tight">{selectedProject.title}</h2><p className="mt-5 text-base leading-7 text-white/65">{selectedProject.intro}</p></div><div className="border-t border-white/15 pt-4 sm:border-l sm:border-t-0 sm:pl-6"><p className="eyebrow">Задача</p><p className="mt-3 text-sm leading-6 text-white/65">{selectedProject.result}</p><div className="mt-7"><p className="eyebrow">Состав работы</p><p className="mt-3 text-sm leading-6 text-white/75">{selectedProject.type}</p></div><p className="mt-7 text-xs text-white/40">{selectedProject.client}</p></div></div><button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d8ff5f] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black transition hover:bg-white" onClick={() => setSelectedProject(null)} type="button">Закрыть кейс <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /></button></div></div>}
    </main>
  )
}

export default App

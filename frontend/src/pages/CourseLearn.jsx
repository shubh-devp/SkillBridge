import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, ChevronLeft, ChevronRight, CheckCircle, Clock, FileText,
  Download, MessageSquare, ThumbsUp, Menu, X, Maximize, Minimize,
  BookOpen, ChevronDown, ChevronUp, Monitor, SkipBack, SkipForward,
  Volume2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const courseData = {
  slug: 'jee-advanced-physics-2026',
  title: 'JEE Advanced 2026: Complete Physics',
  instructor: 'Dr. Rajesh Kumar',
  instructorInitials: 'RK',
  totalLectures: 240,
  completedLectures: 17,
  progress: 7,
};

const weeks = [
  { week: 1, title: 'Mathematical Tools & Vectors', duration: '5 lectures', lectures: [
    { id: '1-1', title: 'Basic Mathematics for Physics', duration: '42:15', completed: true, videoUrl: '#' },
    { id: '1-2', title: 'Vectors and Scalars', duration: '38:40', completed: true, videoUrl: '#' },
    { id: '1-3', title: 'Differentiation & Integration', duration: '45:20', completed: true, videoUrl: '#' },
    { id: '1-4', title: 'Applications in Physics Problems', duration: '50:10', completed: true, videoUrl: '#' },
    { id: '1-5', title: 'Practice Session: Vectors', duration: '55:00', completed: false, videoUrl: '#' },
  ]},
  { week: 2, title: 'Kinematics', duration: '6 lectures', lectures: [
    { id: '2-1', title: 'Motion in 1 Dimension', duration: '44:30', completed: true, videoUrl: '#' },
    { id: '2-2', title: 'Motion in 2 Dimensions', duration: '41:15', completed: true, videoUrl: '#' },
    { id: '2-3', title: 'Projectile Motion', duration: '48:50', completed: true, videoUrl: '#' },
    { id: '2-4', title: 'Relative Motion & River Problems', duration: '52:20', completed: true, videoUrl: '#' },
    { id: '2-5', title: 'Kinematics Problem Solving', duration: '46:10', completed: true, videoUrl: '#' },
    { id: '2-6', title: 'Advanced Kinematics', duration: '54:35', completed: false, videoUrl: '#' },
  ]},
  { week: 3, title: 'Laws of Motion', duration: '5 lectures', lectures: [
    { id: '3-1', title: "Newton's Laws of Motion", duration: '47:20', completed: true, videoUrl: '#' },
    { id: '3-2', title: 'Friction & Its Applications', duration: '43:45', completed: true, videoUrl: '#' },
    { id: '3-3', title: 'Circular Motion Dynamics', duration: '51:30', completed: true, videoUrl: '#' },
    { id: '3-4', title: 'Dynamics of Systems of Particles', duration: '49:15', completed: true, videoUrl: '#' },
    { id: '3-5', title: 'Practice: Laws of Motion', duration: '56:40', completed: false, videoUrl: '#' },
  ]},
  { week: 4, title: 'Work, Energy & Power', duration: '4 lectures', lectures: [
    { id: '4-1', title: 'Work Done by Various Forces', duration: '40:10', completed: false, videoUrl: '#' },
    { id: '4-2', title: 'Kinetic & Potential Energy', duration: '38:25', completed: false, videoUrl: '#' },
    { id: '4-3', title: 'Conservation of Energy', duration: '44:50', completed: false, videoUrl: '#' },
    { id: '4-4', title: 'Power & Collisions', duration: '47:30', completed: false, videoUrl: '#' },
  ]},
  { week: 5, title: 'Rotational Motion', duration: '6 lectures', lectures: [
    { id: '5-1', title: 'Center of Mass', duration: '42:00', completed: false, videoUrl: '#' },
    { id: '5-2', title: 'Torque & Angular Momentum', duration: '46:15', completed: false, videoUrl: '#' },
    { id: '5-3', title: 'Moment of Inertia Calculations', duration: '51:40', completed: false, videoUrl: '#' },
    { id: '5-4', title: 'Rolling Motion', duration: '44:20', completed: false, videoUrl: '#' },
    { id: '5-5', title: 'Rotational Dynamics Problems', duration: '53:10', completed: false, videoUrl: '#' },
    { id: '5-6', title: 'Advanced Rotational Motion', duration: '48:35', completed: false, videoUrl: '#' },
  ]},
];

const lectureNotes = {
  '1-1': {
    keyTakeaways: [
      'Trigonometric functions and their applications in physics',
      'Differentiation as rate of change and its physical meaning',
      'Integration as area under curve',
      'Basic rules of differentiation and integration',
    ],
    formulas: ['d/dx(x^n) = nx^(n-1)', '∫ x^n dx = x^(n+1)/(n+1) + C', 'd/dx(sin x) = cos x', 'd/dx(cos x) = -sin x'],
    downloads: [
      { name: 'Lecture Notes PDF', size: '2.4 MB' },
      { name: 'Practice Problems', size: '1.1 MB' },
      { name: 'Formula Sheet', size: '0.5 MB' },
    ],
    description: 'This lecture covers the fundamental mathematical tools required for physics. We start with basic trigonometry, then move to differentiation and integration. Understanding these concepts is crucial for solving physics problems efficiently.',
  },
  '2-1': {
    keyTakeaways: [
      'Equations of motion for constant acceleration',
      'Graphical analysis of motion',
      'Relative velocity concepts',
      'Problem-solving strategies for kinematics',
    ],
    formulas: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as', 's_n = u + a(2n-1)/2'],
    downloads: [
      { name: 'Lecture Notes PDF', size: '1.8 MB' },
      { name: 'Kinematics Problems', size: '1.5 MB' },
    ],
    description: 'An in-depth exploration of motion in one dimension. We cover displacement, velocity, acceleration, and the equations of motion. Special emphasis on graphical methods and problem-solving techniques.',
  },
};

const comments = [
  { id: 1, name: 'Rohit Sharma', initials: 'RS', text: 'Great explanation of the differentiation rules! The practical examples really helped.', date: '2h ago', likes: 5 },
  { id: 2, name: 'Priya Mehta', initials: 'PM', text: 'Could you also cover integration by substitution in the next session?', date: '5h ago', likes: 3 },
  { id: 3, name: 'Arjun Nair', initials: 'AN', text: 'The problem-solving approach is amazing. I was able to solve all practice questions.', date: '1d ago', likes: 8 },
];

function formatProgress(pct) {
  const all = weeks.flatMap(w => w.lectures);
  const done = all.filter(l => l.completed).length;
  return { total: all.length, completed: done, pct: Math.round((done / all.length) * 100) };
}

export default function CourseLearn() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedWeeks, setExpandedWeeks] = useState([1, 2, 3]);
  const [currentLecture, setCurrentLecture] = useState('1-1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);

  const allLectures = weeks.flatMap(w => w.lectures);
  const currentIdx = allLectures.findIndex(l => l.id === currentLecture);
  const current = allLectures[currentIdx] || allLectures[0];
  const prevLecture = currentIdx > 0 ? allLectures[currentIdx - 1] : null;
  const nextLecture = currentIdx < allLectures.length - 1 ? allLectures[currentIdx + 1] : null;
  const prog = formatProgress();
  const notes = lectureNotes[currentLecture] || lectureNotes['1-1'];

  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev =>
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  const handleLectureChange = (lectureId) => {
    setCurrentLecture(lectureId);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleComplete = () => {
    toast.success('Lecture marked as complete!');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(!isFullscreen);
  };

  const findWeekForLecture = (lectureId) => {
    return weeks.find(w => w.lectures.some(l => l.id === lectureId));
  };

  const currentWeek = findWeekForLecture(currentLecture);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-border/60 bg-surface flex items-center px-4 shrink-0 z-30">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0 rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <Link to={`/courses/${slug}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to course
          </Link>
          <div className="hidden sm:block h-4 w-px bg-border/60" />
          <h1 className="text-sm font-semibold text-foreground truncate">{courseData.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:block">{prog.completed}/{prog.total} lectures</span>
          <Progress value={prog.pct} className="w-20 h-1.5 hidden md:block" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          'w-72 lg:w-80 border-r border-border/60 bg-surface overflow-y-auto shrink-0 transition-all duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-0 lg:overflow-hidden',
        )}>
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground">Course Progress</span>
              <span className="text-xs text-muted-foreground">{prog.pct}%</span>
            </div>
            <Progress value={prog.pct} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">{prog.completed} of {prog.total} lectures completed</p>
          </div>

          <div className="p-2 space-y-1">
            {weeks.map(week => (
              <div key={week.week}>
                <button
                  onClick={() => toggleWeek(week.week)}
                  className={cn(
                    'w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors',
                    currentWeek?.week === week.week ? 'bg-primary/5 text-primary' : 'hover:bg-muted/50 text-foreground',
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent text-white text-[10px] font-bold shrink-0">
                      {week.week}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">Week {week.week}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{week.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-muted-foreground">{week.lectures.filter(l => l.completed).length}/{week.lectures.length}</span>
                    {expandedWeeks.includes(week.week) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </div>
                </button>

                {expandedWeeks.includes(week.week) && (
                  <div className="ml-3 space-y-0.5 pb-1">
                    {week.lectures.map(lecture => (
                      <button
                        key={lecture.id}
                        onClick={() => handleLectureChange(lecture.id)}
                        className={cn(
                          'w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition-colors',
                          currentLecture === lecture.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
                        )}
                      >
                        {lecture.completed ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span className="flex-1 truncate">{lecture.title}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{lecture.duration}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-6">
            {/* Video Player */}
            <div ref={playerRef} className="relative aspect-video rounded-xl overflow-hidden bg-black border border-border/60 group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white/70 text-sm font-medium">Lecture {current.id}</p>
                  <p className="text-white/50 text-xs mt-1">{current.title}</p>
                </div>
              </div>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '35%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 text-white bg-white/10 hover:bg-white/20 rounded-full">
                      <Play className="w-5 h-5 ml-0.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-white/70 ml-2">15:30 / 42:15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white/70" />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-lg" onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" size="sm">Week {currentWeek?.week}</Badge>
                  <span className="text-xs text-muted-foreground">{current.duration}</span>
                </div>
                <h2 className="text-xl font-bold text-foreground">{current.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">{courseData.instructorInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{courseData.instructor}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="outline" className="h-9 text-xs gap-1.5 rounded-lg" onClick={() => toast.success('Downloading...')}>
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
                <Button size="sm" className="h-9 text-xs gap-1.5 rounded-lg" onClick={handleComplete}>
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Complete
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs gap-1.5 rounded-lg"
                disabled={!prevLecture}
                onClick={() => prevLecture && handleLectureChange(prevLecture.id)}
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground">{currentIdx + 1} of {allLectures.length}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs gap-1.5 rounded-lg"
                disabled={!nextLecture}
                onClick={() => nextLecture && handleLectureChange(nextLecture.id)}
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <Separator />

            {/* Lecture Content Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <Card className="p-5 rounded-xl">
                  <h3 className="text-sm font-semibold text-foreground mb-3">About This Lecture</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{notes.description}</p>
                </Card>

                {/* Key Takeaways */}
                <Card className="p-5 rounded-xl">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Key Takeaways</h3>
                  <ul className="space-y-2">
                    {notes.keyTakeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Formulas */}
                <Card className="p-5 rounded-xl">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Important Formulas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {notes.formulas.map((f, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/40 text-sm font-mono text-foreground text-center">
                        {f}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Downloads */}
                <Card className="p-5 rounded-xl">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Downloads & Resources</h3>
                  <div className="space-y-2">
                    {notes.downloads.map((dl, i) => (
                      <button key={i} onClick={() => toast.success(`Downloading ${dl.name}...`)} className="w-full flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{dl.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{dl.size}</span>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Comments Section */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Discussion ({comments.length})
                  </h3>
                  <div className="space-y-3">
                    {comments.map(comment => (
                      <Card key={comment.id} className="p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">{comment.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-foreground">{comment.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.date}</p>
                              </div>
                              <button onClick={() => toast.success('Liked!')} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors shrink-0">
                                <ThumbsUp className="w-3 h-3" />
                                {comment.likes}
                              </button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{comment.text}</p>
                            <button onClick={() => toast.success('Reply feature coming soon')} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-2">
                              <MessageSquare className="w-3 h-3" /> Reply
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Lecture Info */}
              <div className="space-y-4">
                <Card className="p-4 rounded-xl">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Lecture Info</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Week</span>
                      <span className="font-medium text-foreground">Week {currentWeek?.week}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">{current.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={current.completed ? 'success' : 'accent'} size="sm">
                        {current.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Instructor</span>
                      <span className="font-medium text-foreground">{courseData.instructor}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 rounded-xl">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Week Overview</h3>
                  <p className="text-sm font-medium text-foreground mb-1">{currentWeek?.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{currentWeek?.duration}</p>
                  <Progress value={(currentWeek?.lectures.filter(l => l.completed).length / currentWeek?.lectures.length) * 100} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1.5">{currentWeek?.lectures.filter(l => l.completed).length}/{currentWeek?.lectures.length} lectures done</p>
                </Card>

                <Card className="p-4 rounded-xl">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Quick Links</h3>
                  <div className="space-y-1">
                    <button onClick={() => navigate(`/courses/${slug}`)} className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                      Course Details
                    </button>
                    <button onClick={() => navigate('/dashboard/student')} className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                      Dashboard
                    </button>
                    <button onClick={() => navigate('/dashboard/student/courses')} className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                      My Courses
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

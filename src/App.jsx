import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Bug, Dna, Syringe, Microscope, UtensilsCrossed, ChevronLeft, CheckCircle2, Circle, Trophy, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COURSES } from './data';
import './App.css';

const ICON_MAP = {
  FlaskConical,
  Bug,
  Dna,
  Syringe,
  Microscope,
  UtensilsCrossed,
};

function App() {
  const [progress, setProgress] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'course' | 'celebration'

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('uni-quest-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      // Initialize progress
      const initialProgress = {};
      COURSES.forEach(course => {
        initialProgress[course.id] = {};
        course.lessons.forEach(lesson => {
          initialProgress[course.id][lesson.id] = false;
        });
      });
      setProgress(initialProgress);
      localStorage.setItem('uni-quest-progress', JSON.stringify(initialProgress));
    }
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('uni-quest-progress', JSON.stringify(newProgress));
  };

  const getCourseProgress = (courseId) => {
    if (!progress[courseId]) return 0;
    const lessons = Object.values(progress[courseId]);
    const completed = lessons.filter(Boolean).length;
    return Math.round((completed / lessons.length) * 100) || 0;
  };

  const getTotalProgress = () => {
    if (Object.keys(progress).length === 0) return 0;
    let totalLessons = 0;
    let completedLessons = 0;
    
    Object.values(progress).forEach(course => {
      Object.values(course).forEach(isCompleted => {
        totalLessons++;
        if (isCompleted) completedLessons++;
      });
    });
    
    return Math.round((completedLessons / totalLessons) * 100) || 0;
  };

  const handleLessonClick = (courseId, lessonId) => {
    const newProgress = { ...progress };
    const wasCompleted = newProgress[courseId][lessonId];
    newProgress[courseId][lessonId] = !wasCompleted;
    saveProgress(newProgress);

    if (!wasCompleted) {
      // Check if course just finished
      const courseLessons = Object.values(newProgress[courseId]);
      const allCompleted = courseLessons.every(Boolean);
      
      if (allCompleted) {
        triggerConfetti(true);
        // Maybe show celebration view briefly
      } else {
        triggerConfetti(false);
      }
    }
  };

  const triggerConfetti = (big = false) => {
    if (big) {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
      });
    }
  };

  const resetProgress = () => {
    if (window.confirm("האם אתה בטוח שברצונך לאפס את כל ההתקדמות?")) {
      const initialProgress = {};
      COURSES.forEach(course => {
        initialProgress[course.id] = {};
        course.lessons.forEach(lesson => {
          initialProgress[course.id][lesson.id] = false;
        });
      });
      saveProgress(initialProgress);
    }
  };

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="home-view"
    >
      <header className="main-header">
        <div className="header-content">
          <GraduationCap size={40} className="header-icon" />
          <h1>UniQuest</h1>
          <p>המסע שלך בתואר מתחיל כאן</p>
        </div>
        
        <div className="total-progress-card">
          <div className="progress-header">
            <Trophy size={20} className="trophy-icon" />
            <span>התקדמות כללית</span>
            <span className="progress-percent">{getTotalProgress()}%</span>
          </div>
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill main-fill"
              initial={{ width: 0 }}
              animate={{ width: `${getTotalProgress()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      <div className="courses-grid">
        {COURSES.map(course => {
          const Icon = ICON_MAP[course.icon];
          const courseProgress = getCourseProgress(course.id);
          
          return (
            <motion.div 
              key={course.id}
              className="course-card"
              whileHover={{ scale: 1.03, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCourse(course);
                setView('course');
              }}
              style={{ '--course-color': course.color }}
            >
              <div className="course-card-icon" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                <Icon size={32} />
              </div>
              <h2 className="course-card-title">{course.title}</h2>
              <p className="course-card-desc">{course.description}</p>
              
              <div className="course-progress-container">
                <div className="course-progress-header">
                  <span>השלמה</span>
                  <span>{courseProgress}%</span>
                </div>
                <div className="progress-bar-bg small">
                  <motion.div 
                    className="progress-bar-fill"
                    style={{ backgroundColor: course.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${courseProgress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="reset-btn" onClick={resetProgress}>איפוס התקדמות</button>
    </motion.div>
  );

  const renderCourse = () => {
    if (!selectedCourse) return null;
    const Icon = ICON_MAP[selectedCourse.icon];
    const courseProgress = getCourseProgress(selectedCourse.id);

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="course-view"
        style={{ '--course-color': selectedCourse.color }}
      >
        <button className="back-btn" onClick={() => setView('home')}>
          <ChevronLeft size={24} />
          חזור למסך הראשי
        </button>

        <header className="course-detail-header" style={{ borderBottomColor: selectedCourse.color }}>
          <div className="course-detail-icon" style={{ backgroundColor: `${selectedCourse.color}20`, color: selectedCourse.color }}>
            <Icon size={48} />
          </div>
          <div className="course-detail-text">
            <h1>{selectedCourse.title}</h1>
            <p>{selectedCourse.description}</p>
          </div>
        </header>

        <div className="course-detail-progress">
          <div className="progress-header">
            <span>התקדמות בקורס</span>
            <span className="progress-percent" style={{ color: selectedCourse.color }}>{courseProgress}%</span>
          </div>
          <div className="progress-bar-bg large">
            <motion.div 
              className="progress-bar-fill"
              style={{ backgroundColor: selectedCourse.color }}
              initial={{ width: 0 }}
              animate={{ width: `${courseProgress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="lessons-list">
          {selectedCourse.lessons.map((lesson, index) => {
            const isCompleted = progress[selectedCourse.id]?.[lesson.id];
            
            return (
              <motion.div 
                key={lesson.id}
                className={`lesson-item ${isCompleted ? 'completed' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLessonClick(selectedCourse.id, lesson.id)}
              >
                <div className="lesson-number">{index + 1}</div>
                <div className="lesson-content">
                  <h3>{lesson.title}</h3>
                  <p className="lesson-status">{isCompleted ? "הושלם בהצלחה!" : "טרם הושלם"}</p>
                </div>
                <div className="lesson-checkbox">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={32} color={selectedCourse.color} className="check-icon" />
                    ) : (
                      <Circle size={32} color="#94a3b8" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="app-container" dir="rtl">
      <AnimatePresence mode="wait">
        {view === 'home' && <React.Fragment key="home">{renderHome()}</React.Fragment>}
        {view === 'course' && <React.Fragment key="course">{renderCourse()}</React.Fragment>}
      </AnimatePresence>
    </div>
  );
}

export default App;

// Teacher feature management hooks and utilities
import { useState, useEffect } from 'react';

// Available teacher features
export type TeacherFeature = 
  | 'rpp_exam' // RPP and Exam Creation (default)
  | 'attendance' // Attendance System
  | 'daily_reports'; // Daily Activity Reports

// Teacher subscription interface
export interface TeacherSubscription {
  teacherId: string;
  features: TeacherFeature[];
}

// Mock database for teacher features/subscriptions
const teacherFeatures: Record<string, TeacherFeature[]> = {
  // Default teacher will have all features for testing
  'default': ['rpp_exam', 'attendance', 'daily_reports'],
  // Example teachers with different feature sets
  'teacher1': ['rpp_exam'],
  'teacher2': ['rpp_exam', 'attendance'],
  'teacher3': ['rpp_exam', 'daily_reports'],
  'teacher4': ['rpp_exam', 'attendance', 'daily_reports'],
};

/**
 * Check if a teacher has access to a specific feature
 */
export function hasFeatureAccess(teacherId: string, feature: TeacherFeature): boolean {
  // All teachers have access to RPP and Exam Creation by default
  if (feature === 'rpp_exam') return true;
  
  // For other features, check the teacher's subscription
  const features = teacherFeatures[teacherId] || teacherFeatures['default'] || ['rpp_exam'];
  return features.includes(feature);
}

/**
 * Get all features available to a teacher
 */
export function getTeacherFeatures(teacherId: string): TeacherFeature[] {
  return teacherFeatures[teacherId] || teacherFeatures['default'] || ['rpp_exam'];
}

/**
 * Add a feature to a teacher's subscription
 */
export function addTeacherFeature(teacherId: string, feature: TeacherFeature): boolean {
  if (!teacherFeatures[teacherId]) {
    teacherFeatures[teacherId] = ['rpp_exam']; // Start with the default feature
  }
  
  if (!teacherFeatures[teacherId].includes(feature)) {
    teacherFeatures[teacherId].push(feature);
    return true;
  }
  
  return false; // Feature already exists
}

/**
 * Remove a feature from a teacher's subscription (except default RPP feature)
 */
export function removeTeacherFeature(teacherId: string, feature: TeacherFeature): boolean {
  if (feature === 'rpp_exam') return false; // Cannot remove the default feature
  
  if (teacherFeatures[teacherId] && teacherFeatures[teacherId].includes(feature)) {
    teacherFeatures[teacherId] = teacherFeatures[teacherId].filter(f => f !== feature);
    return true;
  }
  
  return false; // Feature doesn't exist or teacher not found
}

/**
 * Hook to access teacher features in components
 */
export function useTeacherFeatures(teacherId: string) {
  const [features, setFeatures] = useState<TeacherFeature[]>(['rpp_exam']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get teacher features
    setTimeout(() => {
      const teacherFeatureList = getTeacherFeatures(teacherId);
      setFeatures(teacherFeatureList);
      setLoading(false);
    }, 500);
  }, [teacherId]);

  const hasFeature = (feature: TeacherFeature): boolean => {
    if (feature === 'rpp_exam') return true; // Default feature
    return features.includes(feature);
  };

  return {
    features,
    hasFeature,
    loading,
  };
} 
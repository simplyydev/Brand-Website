
// Add React import to support React.ReactNode type
import React from 'react';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export interface AuditResult {
  score: number;
  recommendations: string[];
  tips: string;
}

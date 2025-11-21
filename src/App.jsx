import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CampaignPerformanceOverviewDashboard from './pages/campaign-overview'
import RealTimeCampaignMonitoring from './pages/realtime-campaign-monitoring'
import TemplatePerformanceAnalytics from './pages/template-performance-analytics'
import SubscriberAnalyticsDashboard from './pages/subscriber-analytics'
import NotFound from './pages/NotFound'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CampaignPerformanceOverviewDashboard />} />
        <Route path='/realtime-campaign-monitoring' element={<RealTimeCampaignMonitoring />} />
        <Route path="/template-performance-analytics" element={<TemplatePerformanceAnalytics />} />
        <Route path='/subscriber-analytics' element={<SubscriberAnalyticsDashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

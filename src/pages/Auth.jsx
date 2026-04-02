import React from 'react';
import './Auth.css';
import hcmutLogo from '../assets/hcmut_logo.png';

export default function Auth({ onBack, onLoginSuccess }) {
  return (
    <div className="cas-page">
      <div className="cas-wrapper">
        <div className="cas-container">
          <div className="cas-header">
            <div className="cas-logo-mock" onClick={onBack} style={{cursor: onBack ? 'pointer' : 'default'}}>
              <img src={hcmutLogo} alt="HCMUT Logo" width="60" height="60" style={{ objectFit: 'contain' }} />
            </div>
            <div className="cas-title">Central Authentication Service</div>
          </div>
          
          <div className="cas-content">
            <div className="cas-left">
              <div className="cas-h2" style={{ borderBottom: '1px solid #d3d3d3', paddingBottom: '10px' }}>
                Enter your Username and Password
              </div>
              
              <label className="cas-label" htmlFor="username">Username</label>
              <input type="text" id="username" className="cas-input cas-input-user" autoFocus defaultValue="ahihi.123" />
              
              <label className="cas-label" htmlFor="password">Password</label>
              <input type="password" id="password" className="cas-input cas-input-pass" defaultValue="password123!" />
              
              <div className="cas-checkbox-row">
                <input type="checkbox" id="warn" />
                <label className="cas-checkbox-label" htmlFor="warn">Warn me before logging me into other sites.</label>
              </div>
              
              <div className="cas-btn-row">
                <button type="button" className="cas-btn" onClick={onLoginSuccess}>Login</button>
                <button type="button" className="cas-btn" style={{backgroundColor: '#1b65b6'}}>Clear</button>
              </div>
              
              <a href="#" className="cas-link">Change password?</a>
            </div>
            
            <div className="cas-right">
              <div className="cas-h2">Languages</div>
              <div className="cas-lang-links">
                <a href="#">Vietnamese</a>
                <a href="#">English</a>
              </div>
              
              <div className="cas-h2">Please note</div>
              <div className="cas-note-text">
                The Login page enables single sign-on to multiple websites at HCMUT. This means that you only have to enter your user name and password once for websites that subscribe to the Login page.<br/><br/>
                You will need to use your HCMUT Username and password to login to this site. The "HCMUT" account provides access to many resources including the HCMUT Information System, e-mail, ...<br/><br/>
                For security reasons, please Exit your web browser when you are done accessing services that require authentication!
              </div>
              
              <div className="cas-h2">Technical support</div>
              <div className="cas-note-text">
                E-mail: <a href="mailto:support@hcmut.edu.vn" style={{color: '#0044cc', textDecoration: 'none'}}>support@hcmut.edu.vn</a> &nbsp;&nbsp;|&nbsp;&nbsp; Tel: (84-8) 38647256 - 7204
              </div>
            </div>
          </div>
        </div>

        <div className="cas-footer">
          Copyright © 2011 - 2012 Ho Chi Minh University of Technology. All rights reserved.<br/>
          Powered by <a href="#">Jasig CAS 3.5.1</a>
        </div>
      </div>
    </div>
  );
}

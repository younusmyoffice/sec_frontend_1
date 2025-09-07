// Performance monitoring and optimization utilities
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Performance metrics collection
export const initPerformanceMonitoring = () => {
    // Collect Core Web Vitals
    onCLS((metric) => {
        console.log('CLS:', metric);
        // Send to analytics service
        sendToAnalytics('CLS', metric.value);
    });

    onFID((metric) => {
        console.log('FID:', metric);
        sendToAnalytics('FID', metric.value);
    });

    onFCP((metric) => {
        console.log('FCP:', metric);
        sendToAnalytics('FCP', metric.value);
    });

    onLCP((metric) => {
        console.log('LCP:', metric);
        sendToAnalytics('LCP', metric.value);
    });

    onTTFB((metric) => {
        console.log('TTFB:', metric);
        sendToAnalytics('TTFB', metric.value);
    });
};

// Send metrics to analytics service
const sendToAnalytics = (metricName, value) => {
    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics, Mixpanel, etc.
        console.log(`Sending ${metricName}: ${value} to analytics`);
        
        // Example for Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', metricName, {
                event_category: 'Web Vitals',
                value: Math.round(value),
                non_interaction: true,
            });
        }
    }
};

// Performance optimization utilities
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Image lazy loading utility
export const lazyLoadImage = (imgElement) => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    imageObserver.observe(imgElement);
};

// Bundle size monitoring
export const logBundleSize = () => {
    if (process.env.NODE_ENV === 'development') {
        const scripts = document.querySelectorAll('script[src]');
        let totalSize = 0;
        
        scripts.forEach(script => {
            fetch(script.src, { method: 'HEAD' })
                .then(response => {
                    const size = response.headers.get('content-length');
                    if (size) {
                        totalSize += parseInt(size);
                        console.log(`Script: ${script.src}, Size: ${(size / 1024).toFixed(2)} KB`);
                    }
                });
        });
        
        setTimeout(() => {
            console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
        }, 1000);
    }
};

// Memory usage monitoring
export const logMemoryUsage = () => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
        const memory = performance.memory;
        console.log('Memory Usage:', {
            used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
            total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
            limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
        });
    }
};

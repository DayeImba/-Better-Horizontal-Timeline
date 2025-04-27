class Timeline {
    constructor(containerId, data, showTimeDiff = false) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.showTimeDiff = showTimeDiff;
        this.colors = [
            '#F5C6AA', // 奶油杏
            '#F7A072', // 温暖橘
            '#F5D491', // 柔软米黄
            '#F2B5D4', // 活泼樱花粉
            '#E8A4B8', // 柔紫红
            '#F6C28B', // 甜橙奶黄
            '#F2A65A'  // 蜜糖橙
        ];
        
        
        
        
        this.init();
    }

    formatDate(dateStr) {
        return new Date(dateStr.replace(/-/g, '/'));
    }

    calculateTimeDiff(startDate, currentDate) {
        const start = this.formatDate(startDate);
        const current = this.formatDate(currentDate);
        const diffMs = current - start;
        
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        
        let result = '';
        if (days > 0) result += `${days}D`;
        if (remainingHours > 0) result += `${remainingHours}H`;
        if (remainingMinutes > 0) result += `${remainingMinutes}M`;
        
        return result || '0分钟';
    }

    init() {
        this.container.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'timeline-wrapper';
        
        const mainLine = document.createElement('div');
        mainLine.className = 'timeline-line';
        wrapper.appendChild(mainLine);
    
        this.data.forEach((point, index) => {
            const colorIndex = index % this.colors.length;
            const pointElement = this.createTimelinePoint(point, this.colors[colorIndex]);
            wrapper.appendChild(pointElement);
        });
    
        this.container.appendChild(wrapper);
    

        setTimeout(() => {
            const allPoints = wrapper.querySelectorAll('.timeline-point');
            let totalWidth = 0;
            allPoints.forEach(point => {
                totalWidth += point.offsetWidth + parseInt(getComputedStyle(point).marginRight);
            });
            mainLine.style.width = `${totalWidth}px`;
        }, 0);
    }

    createTimelinePoint(pointData, color) {
        const point = document.createElement('div');
        point.className = 'timeline-point';
    
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.style.backgroundColor = color;
    
        const branch = document.createElement('div');
        branch.className = 'timeline-branch';
        branch.style.backgroundColor = color;
    
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'timeline-content-wrapper';
    
        const time = document.createElement('div');
        time.className = 'timeline-time';
        time.textContent = new Date(pointData.time.replace(/-/g, '/')).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        point.appendChild(contentWrapper);
        point.appendChild(dot);
        point.appendChild(branch);
        contentWrapper.appendChild(time);
    
        if (this.showTimeDiff && pointData.time !== this.data[0].time) {
            const timeDiff = document.createElement('div');
            timeDiff.className = 'timeline-diff';
            timeDiff.textContent = this.calculateTimeDiff(this.data[0].time, pointData.time);
            contentWrapper.appendChild(timeDiff);
        }
    
        pointData.contents.forEach(content => {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'timeline-content';
            contentDiv.innerHTML = content;
            contentWrapper.appendChild(contentDiv);
        });
    
        return point;
    }
}
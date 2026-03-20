import { Alpine, pipeline, env, RawImage } from './libs.mjs';

// 로컬 파일 탐색 차단 및 브라우저 캐시 사용
env.allowLocalModels = false;
env.useBrowserCache = true;

/**
 * @returns {import('alpinejs').Alpine.Component}
 */
function imageProcessor() {
    return {
        isDragging: false,
        isLoaded: false,
        isLoading: false,
        status: '🧠 모델을 로드하고 있습니다... (약 100~200MB)',
        originalImageUrl: null,
        originalImage: null,
        resultImageUrl: null,
        resultImage: null,
        segmenter: null,
        powereds: [{
            name: 'Transformers.js',
            url: 'https://huggingface.co/docs/transformers.js'
        }, {
            name: 'Xenova/modnet',
            url: 'https://huggingface.co/Xenova/modnet'
        }],

        async resetImages() {
            this.originalImageUrl = null
            this.originalImage = null
            this.resultImageUrl = null
            this.resultImage = null

            this.status = '✅ 이미지가 초기화되었습니다. 새 이미지를 업로드하세요.';
        },

        async init() {
            try {
                // 모델 로드
                this.segmenter = await pipeline('background-removal', 'Xenova/modnet'); // 사람이 있을때 배경 제거
                // this.segmenter = await pipeline('image-segmentation', 'briaai/RMBG-1.4');
                
                // 모델 로드 완료 후 상태 변경
                this.isLoaded = true; 
                this.status = '🧠 모델 로딩 완료. 이미지를 업로드하세요.';
            } catch (e) {
                this.status = '❌ 오류: 모델을 로드할 수 없습니다. (' + e.message + ')';
            }
        },

        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) this.processDropImage(file);
        },

        handleFileDrop(event) {
            this.isDragging = false;
            const file = event.dataTransfer.files[0];
            if (file) this.processDropImage(file);
        },

        handleRemovalBgBtn() {
            this.processRemovalBackground();
        },

        async processDropImage(file) {
            if (!file.type.startsWith('image/')) {
                this.status = '⚠️ 이미지 파일만 업로드할 수 있습니다.';
                return;
            }

            this.isLoading = true;
            this.originalImage = null;
            this.originalImageUrl = null;

            try {
                this.originalImage = await RawImage.fromBlob(file);
                this.originalImageUrl = URL.createObjectURL(file);
                this.status = '✅ 이미지 업로드 완료. 배경 제거 버튼을 클릭해주세요.';
            } catch (error) {
                this.status = '❌ 오류: 이미지 업로드 중 문제가 발생했습니다.';
            } finally {
                this.isLoading = false;
            }
        },

        async processRemovalBackground() {
            if (!this.segmenter) {
                this.status = '❌ 오류: AI 모델이 아직 준비되지 않았습니다.';
                return;
            }

            if (this.originalImage === null) {
                this.status = '❌ 오류: 처리할 이미지가 없습니다.';
                return;
            }

            this.isLoading = true;
            this.resultImage = null;

            await new Promise((resolve) => setTimeout(resolve, 1000)); // UI 업데이트 대기

            try {
                this.status = '🤖 AI가 배경을 분석 중...';

                // 모델 실행
                const output = await this.segmenter(this.originalImage);
                
                // 결과에서 마스크 데이터 추출
                // modnet 결과는 [{ mask: RawImage, ... }] 형태
                const mask = output[0];

                debugger;

                // 캔버스 생성
                const canvas = document.createElement('canvas');
                canvas.width = this.originalImage.width;
                canvas.height = this.originalImage.height;
                const ctx = canvas.getContext('2d');

                // 원본 이미지 그리기
                ctx.drawImage(mask.toCanvas(), 0, 0);

                // 결과 저장
                this.resultImageUrl = canvas.toDataURL('image/png');

                // blob을 RawImage로 변환
                const resultBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
                this.resultImage = new RawImage(resultBlob);
                this.status = '🎉 배경 제거 완료!';
            } catch (error) {
                this.status = '❌ 오류: ' + error.message;
            } finally {
                this.isLoading = false;
            }
        },
    }
};

Alpine.data('imageProcessor', imageProcessor);
Alpine.start();

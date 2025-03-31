// import { renderToStream } from '@react-pdf/renderer';
// import APINotesPDF from '@/components/common/create-pdf';

// export default async function handler(req: any, res: any) {
//     const pdfStream = await renderToStream(<APINotesPDF />);
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename=api_notes.pdf');
//     pdfStream.pipe(res);
// }
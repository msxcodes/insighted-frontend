import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#fff',
        fontFamily: 'Helvetica'
    },
    header: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#f8fafc',
        borderRadius: 8
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center',
        color: '#0f172a'
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#475569',
        marginBottom: 20
    },
    divider: {
        borderBottom: 2,
        borderBottomColor: '#e2e8f0',
        marginBottom: 20
    },
    section: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 8
    },
    mainHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: '#0369a1',
        paddingBottom: 8,
        borderBottom: 2,
        borderBottomColor: '#e2e8f0'
    },
    description: {
        fontSize: 14,
        lineHeight: 1.6,
        color: '#334155',
        marginBottom: 15
    },
    subHeading: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 12,
        color: '#0f766e'
    },
    importantPoints: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#dc2626',
        marginBottom: 8,
        marginTop: 12
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 15
    },
    bullet: {
        width: 10,
        fontSize: 12,
        color: '#475569'
    },
    bulletText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 1.6,
        color: '#334155'
    },
    nestedBulletPoint: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 30
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 10,
        borderTop: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10
    }
});

const NotesPDF = ({ notes, title = "Lecture Notes", timestamp = new Date().toLocaleDateString() }: { notes: string, title?: string, timestamp?: string }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>Generated on {timestamp}</Text>
                    <View style={styles.divider} />
                </View>

                {/* Content */}
                {notes.split('\n').map((line: string, index: number) => {
                    // Main heading with description (starts with "# " and ends with "**")
                    if (line.match(/^#\s+.*\*\*/)) {
                        const [heading, description] = line.replace(/^#\s+|\*\*$/g, '').split('**');
                        return (
                            <View key={index} style={styles.section}>
                                <Text style={styles.mainHeading}>{heading.trim()}</Text>
                                <Text style={styles.description}>{description.trim()}</Text>
                            </View>
                        );
                    }
                    // Important points (starts with "! ")
                    else if (line.startsWith('! ')) {
                        const text = line.replace(/^!\s+/, '').trim();
                        return (
                            <Text key={index} style={styles.importantPoints}>⚠️ {text}</Text>
                        );
                    }
                    // Sub heading (starts with "## ")
                    else if (line.startsWith('## ')) {
                        const subheading = line.replace(/^##\s+/, '').trim();
                        return (
                            <Text key={index} style={styles.subHeading}>{subheading}</Text>
                        );
                    }
                    // Nested bullet points (starts with multiple spaces/tabs and -)
                    else if (line.match(/^\s+-/)) {
                        const text = line.replace(/^\s+-\s+/, '').trim();
                        return (
                            <View key={index} style={styles.nestedBulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletText}>{text}</Text>
                            </View>
                        );
                    }
                    // Regular bullet points
                    else if (line.startsWith('-')) {
                        const text = line.replace(/^-\s+/, '').trim();
                        return (
                            <View key={index} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletText}>{text}</Text>
                            </View>
                        );
                    }
                    return null;
                })}

                {/* Footer */}
                <Text style={styles.footer}>
                    Generated by InsightED • Page 1 of 1
                </Text>
            </Page>
        </Document>
    );
};

export default NotesPDF;

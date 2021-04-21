import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MergeMdFile {
    public static void main(String[] args) throws IOException {
        String sourceDir = "E:\\zhoucanxiong\\learn\\vuepress\\docs\\webpack";
        String outfilePath = sourceDir + "\\result.md";

        List<File> fileList = getFileList(new File(sourceDir));

        fileList.sort(new Comparator<File>() {
            @Override
            public int compare(File o1, File o2) {
                return o1.getName().compareTo(o2.getName());
            }
        });

        BufferedWriter bw = new BufferedWriter(new FileWriter(outfilePath, true));
        for (File file : fileList) {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line = null;
            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();
                bw.flush();
            }

            br.close();
        }

        bw.close();
    }


    public static List<File> getFileList(File file) throws IOException {
        List<File> list = new ArrayList<File>();

        File[] files = file.listFiles();
        for (File file1 : files) {
            String file1Name = file1.getName();
            Pattern p = Pattern.compile("^\\d{2}.+\\.md$");
            Matcher m = p.matcher(file1Name);
            if (file1.isFile() && m.find()) {
                list.add(file1);
                // System.out.println(file1Name);
            }
        }

        return list;

    }
}
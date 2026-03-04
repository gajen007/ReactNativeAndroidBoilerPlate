import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Element from './Element';

  const styles = StyleSheet.create({
    viewStyle: {
      paddingLeft: 20,
      paddingRight: 20,
    }
  });

interface ele {
  id: number;
  nme: string;
  desc: string;
}

export default function Timeline (){
  const [dataContainer] = useState<ele[]>([
    {id:1,nme:'Toronto',desc:'Ontario\'s Capital'},
    {id:2,nme:'Markham',desc:'North of Toronto'},
    {id:3,nme:'Pickering',desc:'Durham City'},
    {id:4,nme:'Stoufville',desc:'North of Markham'},
    {id:5,nme:'Ajax',desc:'Durham City'},
    {id:6,nme:'Oshawa',desc:'Durham City'},
    {id:7,nme:'Whitby',desc:'Durham City'},
    {id:8,nme:'Vaughan',desc:'York Region\'s west-end'},
    {id:9,nme:'Newmarket',desc:'Far north from Richmondhill'},
    {id:10,nme:'Richmondhill',desc:'Above Hwy7'},
    {id:11,nme:'Brampton',desc:'High-Crime Rate'},
    {id:12,nme:'Mississauga',desc:'Peel\'s Industrial City'}
]);
  return (<ScrollView style={styles.viewStyle}>
    {
      Array.isArray(dataContainer) && dataContainer.map((e:ele) => {
        return <Element key={e.id} elementID={e.id} elementName={e.nme} elementDescription={e.desc} />
        })
      }
      </ScrollView>
);
}
### download

```bash
$ yarn add @wjrtest/bc-bl-drawer
# or
$ npx @wjrtest/bc-bl-drawer
```

### The basic use

API Please refer to the documentation

```
import BlDrawer from '@wjrtest/bc-bl-drawer';
{visible && (
        <BlDrawer
          visible={visible}
          pid={1}
          zryDays={12}
          hasDetail={true}
          onClose={() => setVisible(false)}
          api={{
            detailAPI: getBlListDetail,
            mockDetailAPI: getBlDetailSimulation,
            flagAPI: getFlag,
            diagsAPI: getCheckSelect,
            operasAPI: getOperationSelect,
            updateBedAPI: updateBedQuitConfig,
            zryListAPI: getBlListZryList,
          }}
        />
      )}
```
